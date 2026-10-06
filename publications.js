// Topic membership is keyed by the paper link in publications.jemdoc.
// Topic links filter the existing entries: each paper appears once, grouped by year.
(function () {
  "use strict";
  var topics = [
    "Uncertainty quantification", "Interpretable machine learning",
    "Statistical learning", "Ensemble methods", "Data integration",
    "Spectral methods", "Graph learning"
  ];
  var membership = {
    "2609.36396": [0, 1, 2, 3],
    "2609.24126": [1, 2, 3],
    "2406.13833": [2, 4, 5],
    "2206.02088": [0, 1, 3],
    "2502.06661": [0, 1, 3],
    "2209.08273": [4, 5, 6],
    "2308.01475": [1],
    "2312.14416": [4, 5, 6],
    "2304.09305": [2],
    "2210.11625": [0, 4, 6],
    "2305.13491": [4, 6],
    "20-1365": [2],
    "2010.02482": [2, 5],
    "9820079": [4, 5],
    "9746583": [4, 6],
    "2003.07429": [2, 6],
    "1cb524b5a3f3f82be4a7d954063c07e2": [2],
    "1576119708": [0, 6]
  };
  function initialize() {
    var yearView = document.getElementById("papers-by-year");
    var filter = document.getElementById("paper-topic-filter");
    var label = document.getElementById("paper-topic-label");
    if (!yearView || !filter || !label) return;
    var links = Array.from(document.querySelectorAll(".research-topic-link"));
    var papers = Array.from(yearView.querySelectorAll("li"));
    var headings = Array.from(yearView.querySelectorAll("h2"));
    var slugs = topics.map(function (topic) { return "#topic-" + topic.toLowerCase().replace(/ /g, "-"); });
    function select(index) {
      papers.forEach(function (paper) {
        var firstLink = paper.querySelector("a");
        var key = firstLink && Object.keys(membership).find(function (id) {
          return firstLink.getAttribute("href").includes(id);
        });
        paper.hidden = index >= 0 && !(key && membership[key].includes(index));
      });
      yearView.querySelectorAll("ul").forEach(function (list) {
        list.hidden = !Array.from(list.children).some(function (paper) { return !paper.hidden; });
      });
      headings.forEach(function (heading) {
        var sibling = heading.nextElementSibling;
        var anyVisible = false;
        while (sibling && sibling.tagName !== "H2") {
          if (sibling.tagName === "UL" && !sibling.hidden) anyVisible = true;
          sibling = sibling.nextElementSibling;
        }
        heading.hidden = !anyVisible;
      });
      links.forEach(function (link) {
        if (Number(link.dataset.topic) === index) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
      filter.hidden = index < 0;
      label.textContent = index >= 0 ? topics[index] : "";
    }
    function syncHash() { select(slugs.indexOf(window.location.hash)); }
    // Topic links use regular fragments, supporting direct links and browser Back/Forward.
    links.forEach(function (link) {
      link.addEventListener("click", function () { select(Number(link.dataset.topic)); });
    });
    filter.querySelector("a").addEventListener("click", function () { select(-1); });
    window.addEventListener("hashchange", syncHash);
    syncHash();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize);
  else initialize();
}());
