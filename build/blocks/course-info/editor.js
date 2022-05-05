/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/library/trash.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/trash.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const trash = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M20 5h-5.7c0-1.3-1-2.3-2.3-2.3S9.7 3.7 9.7 5H4v2h1.5v.3l1.7 11.1c.1 1 1 1.7 2 1.7h5.7c1 0 1.8-.7 2-1.7l1.7-11.1V7H20V5zm-3.2 2l-1.7 11.1c0 .1-.1.2-.3.2H9.1c-.1 0-.3-.1-.3-.2L7.2 7h9.6z"
}));
/* harmony default export */ __webpack_exports__["default"] = (trash);
//# sourceMappingURL=trash.js.map

/***/ }),

/***/ "./src/blocks/course-info/editor.tsx":
/*!*******************************************!*\
  !*** ./src/blocks/course-info/editor.tsx ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/trash.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_url_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/url-svg */ "./src/components/url-svg/index.tsx");
/* harmony import */ var _components_course_links__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/course-links */ "./src/components/course-links/index.tsx");
/* harmony import */ var _utils_meta_formatting__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/meta-formatting */ "./src/utils/meta-formatting.ts");
/* harmony import */ var _utils_meta_map_keys__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/meta-map-keys */ "./src/utils/meta-map-keys.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../types */ "./src/types.ts");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./block.json */ "./src/blocks/course-info/block.json");
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./style.module.scss */ "./src/blocks/course-info/style.module.scss");

















function RenderedCoursePage(_ref) {
  let {
    meta,
    children
  } = _ref;
  const studentRepresentativeItems = meta.student_representatives.filter(representative => representative.name || representative.cid);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, `${(0,_utils_meta_formatting__WEBPACK_IMPORTED_MODULE_9__.formatCode)(meta.code)} | ${(0,_utils_meta_formatting__WEBPACK_IMPORTED_MODULE_9__.formatCredits)(meta.credits)} | ${(0,_utils_meta_formatting__WEBPACK_IMPORTED_MODULE_9__.formatProgramYear)(meta.year, meta.programs)} | ${(0,_utils_meta_formatting__WEBPACK_IMPORTED_MODULE_9__.formatSP)(meta.study_perionds)}`), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: _style_module_scss__WEBPACK_IMPORTED_MODULE_13__["default"]["course-layout"]
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: _style_module_scss__WEBPACK_IMPORTED_MODULE_13__["default"]["course-content"]
  }, children), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: _style_module_scss__WEBPACK_IMPORTED_MODULE_13__["default"]["course-sidebar"]
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_course_links__WEBPACK_IMPORTED_MODULE_8__["default"], {
    header: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Links', 'ftek-courses')),
    meta: meta
  }), studentRepresentativeItems.length > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Student Representatives', 'ftek-courses')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, studentRepresentativeItems.map((representatitve, i) => {
    const name = representatitve.name || representatitve.cid;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      key: i
    }, representatitve.cid ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: `mailto:${representatitve.cid}@student.chalmers.se`
    }, name) : name);
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Is Anything Missing?', 'ftek-courses')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    dangerouslySetInnerHTML: {
      __html: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Contact <a %$1s>SNF</a>.', 'ftek-courses').replace('%$1s', 'href="mailto:snf@ftek.se"')
    }
  }))));
}

function EditableCoursePage(_ref2) {
  let {
    attributes,
    setAttributes,
    panelIcon
  } = _ref2;
  const [creditsText, setCreditsText] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [participantCountText, setParticipantCountText] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const driveList = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => select('core/blocks').getBlockType('wp-drive-list/drive-list'), []);
  const innerBlocksTemplate = [['core/heading', {
    content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Description', 'ftek-courses'),
    level: 3
  }], ['core/paragraph', {
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Description goes here.', 'ftek-courses')
  }], ...(driveList ? [['core/heading', {
    content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__._x)('Documents', 'drive list heading', 'ftek-courses'),
    level: 3
  }], ['wp-drive-list/drive-list', {
    depth: 2,
    download: true
  }]] : [])];
  const postType = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => select('core/editor').getCurrentPostType(), []);
  const [partialPostMeta, setPostMeta] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.useEntityProp)('postType', postType, 'meta');
  const meta = { ...attributes,
    ...(postType === 'course-page' ? (0,_utils_meta_map_keys__WEBPACK_IMPORTED_MODULE_10__.removePrefix)(partialPostMeta) : {})
  };

  const setMeta = m => {
    setAttributes(m);

    if (postType === 'course-page') {
      setPostMeta((0,_utils_meta_map_keys__WEBPACK_IMPORTED_MODULE_10__.addPrefix)(m));
    }
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Course Page', 'ftek-courses'),
    initialOpen: true,
    icon: panelIcon
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Course code', 'ftek-courses'),
    value: meta.code,
    onChange: value => setMeta({ ...meta,
      code: value
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Credits', 'ftek-courses'),
    value: creditsText !== null ? creditsText : meta.credits,
    onChange: value => {
      setCreditsText(value);
      const numeric = Number(value);

      if (Number.isFinite(numeric) && numeric >= 0) {
        setMeta({ ...meta,
          credits: numeric
        });
      }
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Course homepage URL', 'ftek-courses'),
    value: meta.homepage_url,
    onChange: value => setMeta({ ...meta,
      homepage_url: value
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Course info URL', 'ftek-courses'),
    value: meta.info_url,
    onChange: value => setMeta({ ...meta,
      info_url: value
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Latest course survey URL', 'ftek-courses'),
    value: meta.survey_url,
    onChange: value => setMeta({ ...meta,
      survey_url: value
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: _style_module_scss__WEBPACK_IMPORTED_MODULE_13__["default"]["list-selector"]
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: _style_module_scss__WEBPACK_IMPORTED_MODULE_13__["default"]["panel-label"]
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Student representatives', 'ftek-courses')), meta.student_representatives.map((representative, i) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: i,
    className: _style_module_scss__WEBPACK_IMPORTED_MODULE_13__["default"]["list-selector-item"]
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_14__["default"],
    onClick: () => {
      const representatives = [...meta.student_representatives];
      representatives.splice(i, 1);
      setMeta({ ...meta,
        student_representatives: representatives
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: _style_module_scss__WEBPACK_IMPORTED_MODULE_13__["default"]["stacked-inputs"]
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Full Name', 'ftek-courses'),
    value: representative.name,
    onChange: value => {
      const representatives = [...meta.student_representatives];
      representatives[i] = { ...representative,
        name: value
      };
      setMeta({ ...meta,
        student_representatives: representatives
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__._x)('CID', 'Chalmers ID', 'ftek-courses'),
    value: representative.cid,
    onChange: value => {
      const representatives = [...meta.student_representatives];
      representatives[i] = { ...representative,
        cid: value
      };
      setMeta({ ...meta,
        student_representatives: representatives
      });
    }
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
    onClick: () => setMeta({ ...meta,
      student_representatives: [...meta.student_representatives, {
        name: '',
        cid: ''
      }]
    }),
    variant: "secondary"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__._x)('Add', 'student representative', 'ftek-courses')))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: _style_module_scss__WEBPACK_IMPORTED_MODULE_13__["default"]["panel-label"]
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Study period', 'ftek-courses')), _types__WEBPACK_IMPORTED_MODULE_11__.studyPerionds.map((sp, i) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.CheckboxControl, {
    key: i,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__._x)('SP%$1s', 'study period', 'ftek-courses').replace('%$1s', sp.toString()),
    checked: meta.study_perionds.includes(sp),
    onChange: () => {
      const sps = [...meta.study_perionds];
      const index = sps.indexOf(sp);

      if (index >= 0) {
        sps.splice(index, 1);
      } else {
        sps.push(sp);
      }

      setMeta({ ...meta,
        study_perionds: sps
      });
    }
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RadioControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__._x)('Year', 'grade', 'ftek-courses'),
    selected: meta.year,
    options: _types__WEBPACK_IMPORTED_MODULE_11__.years.map(year => ({
      label: (0,_utils_meta_formatting__WEBPACK_IMPORTED_MODULE_9__.formatYear)(year),
      value: year
    })),
    onChange: value => setMeta({ ...meta,
      year: value
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: _style_module_scss__WEBPACK_IMPORTED_MODULE_13__["default"]["panel-label"]
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Progammes', 'ftek-courses')), _types__WEBPACK_IMPORTED_MODULE_11__.programs.map((program, i) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.CheckboxControl, {
    key: i,
    label: program,
    checked: meta.programs.includes(program),
    onChange: () => {
      const prgs = [...meta.programs];
      const index = prgs.indexOf(program);

      if (index >= 0) {
        prgs.splice(index, 1);
      } else {
        prgs.push(program);
      }

      setMeta({ ...meta,
        programs: prgs
      });
    }
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Approximate number of participants', 'ftek-courses'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Used for sorting courses', 'ftek-courses'),
    value: participantCountText !== null ? participantCountText : meta.participant_count,
    onChange: value => {
      setParticipantCountText(value);
      const numeric = Number(value);

      if (Number.isFinite(numeric) && numeric >= 0) {
        setMeta({ ...meta,
          participant_count: numeric
        });
      }
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.CheckboxControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Elective course', 'ftek-courses'),
    checked: meta.elective,
    onChange: checked => {
      setMeta({ ...meta,
        elective: checked
      });
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Comment', 'ftek-courses'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Shown as footnote in course table', 'ftek-courses'),
    value: meta.comment,
    onChange: value => {
      setMeta({ ...meta,
        comment: value
      });
    }
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RenderedCoursePage, {
    meta: meta
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks, {
    template: innerBlocksTemplate
  })));
}

function Edit(_ref3) {
  let {
    attributes,
    setAttributes
  } = _ref3;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)(), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(EditableCoursePage, {
    attributes: attributes,
    setAttributes: setAttributes,
    panelIcon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_url_svg__WEBPACK_IMPORTED_MODULE_7__["default"], {
      url: wpFtekCoursePagesCourseInfoEditor.iconUrl,
      style: {
        width: 24,
        height: 24,
        marginLeft: 12
      }
    })
  }));
}

function Save(_ref4) {
  let {
    attributes
  } = _ref4;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save(), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RenderedCoursePage, {
    meta: attributes
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content, null)));
}

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_12__, {
  edit: Edit,
  save: Save,
  icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_url_svg__WEBPACK_IMPORTED_MODULE_7__["default"], {
    url: wpFtekCoursePagesCourseInfoEditor.iconUrl
  })
});

/***/ }),

/***/ "./src/components/course-links/index.tsx":
/*!***********************************************!*\
  !*** ./src/components/course-links/index.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);



function CourseLinks(_ref) {
  let {
    header,
    meta
  } = _ref;
  const linkItems = [{
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Course homepage', 'ftek-courses'),
    url: meta.homepage_url
  }, {
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('General info', 'ftek-courses'),
    url: meta.info_url
  }, {
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Latest survey', 'ftek-courses'),
    url: meta.survey_url
  }, ...(meta.code ? [{
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Exam statistics', 'ftek-courses'),
    url: `https://stats.ftek.se/${meta.code}`
  }] : [])].filter(link => link.url);

  if (linkItems.length === 0) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, header, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0
    }
  }, linkItems.map((link, i) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: i
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: link.url
  }, link.text)))));
}

/* harmony default export */ __webpack_exports__["default"] = (CourseLinks);

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

/***/ "./src/utils/meta-map-keys.ts":
/*!************************************!*\
  !*** ./src/utils/meta-map-keys.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "removePrefix": function() { return /* binding */ removePrefix; },
/* harmony export */   "addPrefix": function() { return /* binding */ addPrefix; }
/* harmony export */ });
const removePrefix = meta => {
  return Object.fromEntries(Object.entries(meta).filter(_ref => {
    let [k] = _ref;
    return k.startsWith('wp_ftek_course_pages_');
  }).map(_ref2 => {
    let [k, v] = _ref2;
    return [k.replace('wp_ftek_course_pages_', ''), v];
  }));
};
const addPrefix = meta => {
  return Object.fromEntries(Object.entries(meta).map(_ref3 => {
    let [k, v] = _ref3;
    return [`wp_ftek_course_pages_${k}`, v];
  }));
};

/***/ }),

/***/ "./src/blocks/course-info/style.module.scss":
/*!**************************************************!*\
  !*** ./src/blocks/course-info/style.module.scss ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"course-layout":"ruPN8Hq9h8zvk6Upmt54","course-sidebar":"W65MX1tUJkLPABEsBgSh","course-content":"ZunuI_dlXD2B7UUPJYCv","list-selector":"OKd8PdA8EcP_9dTAqH0U","list-selector-item":"k4VLcp5Glu59wexcetoT","stacked-inputs":"wyuyO16ehWvP7Egpfc0B","panel-label":"cQw6EypMTVyZnWONggDQ"});

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

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["data"];

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

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "./src/blocks/course-info/block.json":
/*!*******************************************!*\
  !*** ./src/blocks/course-info/block.json ***!
  \*******************************************/
/***/ (function(module) {

module.exports = JSON.parse('{"apiVersion":2,"name":"ftek-courses/course-info","title":"Course info","category":"widgets","textdomain":"ftek-courses","attributes":{"code":{"type":"string","default":""},"credits":{"type":"number","default":0},"homepage_url":{"type":"string","default":""},"info_url":{"type":"string","default":""},"survey_url":{"type":"string","default":""},"student_representatives":{"type":"array","default":[]},"study_perionds":{"type":"array","default":[]},"year":{"enum":["","1","2","3","master"],"default":""},"programs":{"type":"array","default":[]},"participant_count":{"type":"number","default":0},"elective":{"type":"boolean","default":false},"comment":{"type":"string","default":""}},"style":"file:style-editor.css","editorScript":"file:editor.js"}');

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"blocks/course-info/editor": 0,
/******/ 			"blocks/course-info/style-editor": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["blocks/course-info/style-editor"], function() { return __webpack_require__("./src/blocks/course-info/editor.tsx"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=editor.js.map