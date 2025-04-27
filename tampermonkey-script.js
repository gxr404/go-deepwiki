// ==UserScript==
// @name         github-go-deepwiki
// @namespace
// @version      0.3
// @description  github仓库跳转到deepwiki
// @source       https://github.com/gxr404/go-deepwiki
// @author       gxr404
// @match        https://github.com/*
// @grant        none
// ==/UserScript==
(function() {
  'use strict';

  const bodyEl = document.querySelector('body')
  if (bodyEl) {
      watchDom(bodyEl, main)
      main()
  }
})();

function watchDom(dom, callback) {
  const observer = new MutationObserver(() => {
    callback()
  })
  observer.observe(dom, {
    childList: true,
    subtree: true,
  })
}

function main() {
  // match https://github.com/<user>/<repo>
  if (location.pathname.split('/').filter(Boolean).length !== 2) return
  if (document.getElementById('go-deepwiki')) return
  const repoBtnContainer = document.getElementById('repository-details-container')
  if (!repoBtnContainer) return
  const btnList = repoBtnContainer.querySelector('ul')
  if (!btnList) return
  btnList.appendChild(createGoDeepWikiDOM())
}

function createGoDeepWikiDOM() {
  const li = document.createElement('li')
  const repName = location.pathname.split('/').filter(Boolean).slice(0,2).join('/')
  const deepWikiUrl = `https://deepwiki.com/${repName}`
  li.innerHTML = `
<li id="go-deepwiki">
  <div data-view-component="true" class="BtnGroup d-flex">
      <a href="${deepWikiUrl}"
        rel="nofollow"
        aria-label="Go DeepDeepwikiWiki"
        data-view-component="true"
        class="tooltipped tooltipped-sw btn-sm btn">
        Go Deepwiki
      </a>
  </div>
</li>
`
  return li
}
