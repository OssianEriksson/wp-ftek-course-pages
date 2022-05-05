/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/course-table/index.tsx":
/*!***********************************************!*\
  !*** ./src/components/course-table/index.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CourseTable; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_useFetchAll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/useFetchAll */ "./src/hooks/useFetchAll.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../types */ "./src/types.ts");
/* harmony import */ var _utils_meta_formatting__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/meta-formatting */ "./src/utils/meta-formatting.ts");
/* harmony import */ var _index_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./index.module.scss */ "./src/components/course-table/index.module.scss");








function YearTable(_ref) {
  let {
    posts,
    year,
    footnotes
  } = _ref;
  const allPrograms = ['multiple', ..._types__WEBPACK_IMPORTED_MODULE_3__.programs];
  const maxCourses = Object.fromEntries(allPrograms.map(program => [program, Math.max(...Object.values(posts[program]).map(p => p.length))]));

  if (Math.max(...Object.values(maxCourses)) <= 0) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No courses found', 'ftek-courses'));
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null), _types__WEBPACK_IMPORTED_MODULE_3__.studyPerionds.map((sp, i) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    key: i
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Study period %$1s', 'ftek-courses').replace('%$1s', sp.toString()))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, allPrograms.map((program, i) => {
    const p = posts[program];
    const rows = maxCourses[program];
    return [...Array(maxCourses[program]).keys()].map(j => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
      key: `${i}.${j}`
    }, j === 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
      rowSpan: rows
    }, program === 'multiple' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x)('Y%$1s', 'grade', 'ftek-courses').replace('%$1s', year) : (0,_utils_meta_formatting__WEBPACK_IMPORTED_MODULE_4__.formatProgramYear)(year, [program])), _types__WEBPACK_IMPORTED_MODULE_3__.studyPerionds.flatMap((sp, l) => {
      if (j > p[sp].length) {
        return [];
      }

      if (j === p[sp].length) {
        return [(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
          key: l,
          rowSpan: rows - j
        })];
      }

      const post = p[sp][j];
      return [(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
        key: l
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
        href: post.link
      }, post.title), post.comments.map((comment, k) => {
        const idx = footnotes[comment];
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("sup", {
          key: k
        }, k > 0 && ',', (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
          href: `#table-footnote-${idx}`
        }, idx));
      }))];
    })));
  })));
}

function CourseTable() {
  const allPosts = (0,_hooks_useFetchAll__WEBPACK_IMPORTED_MODULE_2__["default"])({
    path: '/wp/v2/course-page'
  });
  const posts = Object.fromEntries(_types__WEBPACK_IMPORTED_MODULE_3__.years.filter(year => year !== 'master').map(year => [year, Object.fromEntries([..._types__WEBPACK_IMPORTED_MODULE_3__.programs, 'multiple'].map(program => [program, Object.fromEntries(_types__WEBPACK_IMPORTED_MODULE_3__.studyPerionds.map(sp => [sp, []]))]))]));
  let footnotesIndex = 1;

  const electiveCourseComment = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Elective course', 'ftek-courses');

  const footnotes = {};
  allPosts.forEach(post => {
    const {
      wp_ftek_course_pages_programs: prog,
      wp_ftek_course_pages_year: year,
      wp_ftek_course_pages_study_perionds: sps,
      wp_ftek_course_pages_comment: comment,
      wp_ftek_course_pages_elective: elective
    } = post.meta;

    if (prog.length <= 0 || !year) {
      return;
    }

    const comments = [...(elective ? [electiveCourseComment] : []), ...(comment ? [comment] : [])];
    comments.forEach(c => {
      if (!(c in footnotes)) {
        footnotes[c] = footnotesIndex++;
      }
    });
    const program = prog.length > 1 ? 'multiple' : prog[0];
    sps.forEach(sp => {
      posts[year][program][sp].push({
        title: post.title.rendered,
        link: post.link,
        comments
      });
    });
  });
  const footnotesEntries = Object.entries(footnotes);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: _index_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"]["table-wrapper"]
  }, _types__WEBPACK_IMPORTED_MODULE_3__.years.filter(year => year !== 'master').map((year, i) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: i
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x)('Year %$1s', 'grade', 'ftek-courses').replace('%$1s', year)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(YearTable, {
    year: year,
    posts: posts[year],
    footnotes: footnotes
  }))), footnotesEntries.length > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, footnotesEntries.map((_ref2, i) => {
    let [text, idx] = _ref2;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: i
    }, i > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      id: `table-footnote-${idx}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("sup", null, idx), text));
  })));
}

/***/ }),

/***/ "./src/components/url-svg/index.tsx":
/*!******************************************!*\
  !*** ./src/components/url-svg/index.tsx ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


function UrlSVG(_ref) {
  let {
    url,
    style
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    style: style
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("image", {
    style: {
      width: '100%'
    },
    xlinkHref: url
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (UrlSVG);

/***/ }),

/***/ "./src/hooks/useFetchAll.ts":
/*!**********************************!*\
  !*** ./src/hooks/useFetchAll.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ useFetchAll; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_2__);

 // eslint-disable-line import/named


const PAGE_SIZE = 100;
function useFetchAll(options, deps) {
  const [data, setData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (data.length % PAGE_SIZE === 0) {
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({ ...options,
        path: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_2__.addQueryArgs)(options.path, {
          per_page: PAGE_SIZE,
          offset: data.length
        })
      }).then(morePosts => {
        if (Array.isArray(morePosts) && morePosts.length > 0) {
          setData([...data, ...morePosts]);
        }
      }).catch(console.error); // eslint-disable-line no-console
    }
  }, [data, deps]);
  return data;
}

/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "programs": function() { return /* binding */ programs; },
/* harmony export */   "studyPerionds": function() { return /* binding */ studyPerionds; },
/* harmony export */   "years": function() { return /* binding */ years; }
/* harmony export */ });
const programs = ['F', 'TM'];
const studyPerionds = [1, 2, 3, 4];
const years = ['1', '2', '3', 'master'];

/***/ }),

/***/ "./src/utils/meta-formatting.ts":
/*!**************************************!*\
  !*** ./src/utils/meta-formatting.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatCode": function() { return /* binding */ formatCode; },
/* harmony export */   "formatCredits": function() { return /* binding */ formatCredits; },
/* harmony export */   "formatProgramYear": function() { return /* binding */ formatProgramYear; },
/* harmony export */   "formatYear": function() { return /* binding */ formatYear; },
/* harmony export */   "formatSP": function() { return /* binding */ formatSP; }
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);

const formatCode = code => code || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Course Code', 'ftek-courses');
const formatCredits = credits => (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__._x)('%$1s hec', 'higher education credits', 'ftek-courses').replace('%$1s', (credits || 0).toString());
const formatProgramYear = (year, programs) => {
  if (year === 'master') {
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Master's course", 'ftek-courses');
  }

  if (programs.length > 0) {
    return programs.sort().map(program => program + year || '').join(' ');
  }

  return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__._x)('Year', 'grade', 'ftek-courses');
};
const formatYear = year => {
  if (year === 'master') {
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Master's course", 'ftek-courses');
  }

  return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__._x)('Year %$1s', 'grade', 'ftek-courses').replace('%$1s', year);
};
const formatSP = sps => sps.length > 0 ? sps.sort().map(a => [[a]]).reduce((previous, current) => {
  const range = previous[previous.length - 1];

  if (current[0][0] - range[range.length - 1] === 1) {
    range.push(current[0][0]);
  } else {
    previous.push(current[0]);
  }

  return previous;
}).map(range => (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__._x)('SP%$1s', 'study period', 'ftek-courses').replace('%$1s', range.length > 1 ? range[0] + '-' + range[range.length - 1] : range[0].toString())).join(' ') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__._x)('SP', 'study period', 'ftek-courses');

/***/ }),

/***/ "./src/components/course-table/index.module.scss":
/*!*******************************************************!*\
  !*** ./src/components/course-table/index.module.scss ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"table-wrapper":"Kq5Bbl4fGewfVmAXLltM"});

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/url":
/*!*****************************!*\
  !*** external ["wp","url"] ***!
  \*****************************/
/***/ (function(module) {

module.exports = window["wp"]["url"];

/***/ }),

/***/ "./src/blocks/course-table/block.json":
/*!********************************************!*\
  !*** ./src/blocks/course-table/block.json ***!
  \********************************************/
/***/ (function(module) {

module.exports = JSON.parse('{"apiVersion":2,"name":"ftek-courses/course-table","title":"Course table","category":"widgets","textdomain":"ftek-courses","style":"file:view.css","viewScript":"file:view.js","editorScript":"file:editor.js"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!********************************************!*\
  !*** ./src/blocks/course-table/editor.tsx ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_url_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/url-svg */ "./src/components/url-svg/index.tsx");
/* harmony import */ var _components_course_table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/course-table */ "./src/components/course-table/index.tsx");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./block.json */ "./src/blocks/course-table/block.json");







function Edit() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)(), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_course_table__WEBPACK_IMPORTED_MODULE_4__["default"], null));
}

function Save() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save());
}

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_5__, {
  edit: Edit,
  save: Save,
  icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_url_svg__WEBPACK_IMPORTED_MODULE_3__["default"], {
    url: wpFtekCoursePagesCourseTableEditor.iconUrl
  })
});
}();
/******/ })()
;
//# sourceMappingURL=editor.js.map