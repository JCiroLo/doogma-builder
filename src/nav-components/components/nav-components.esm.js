import { B as BUILD, c as consoleDevInfo, p as plt, w as win, H, d as doc, N as NAMESPACE, a as promiseResolve, b as bootstrapLazy } from './index-55235861.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

/*
 Stencil Client Patch Browser v2.16.1 | MIT Licensed | https://stenciljs.com
 */
const getDynamicImportFunction = (namespace) => `__sc_import_${namespace.replace(/\s|-/g, '_')}`;
const patchBrowser = () => {
    // NOTE!! This fn cannot use async/await!
    if (BUILD.isDev && !BUILD.isTesting) {
        consoleDevInfo('Running in development mode.');
    }
    if (BUILD.cssVarShim) {
        // shim css vars
        plt.$cssShim$ = win.__cssshim;
    }
    if (BUILD.cloneNodeFix) {
        // opted-in to polyfill cloneNode() for slot polyfilled components
        patchCloneNodeFix(H.prototype);
    }
    if (BUILD.profile && !performance.mark) {
        // not all browsers support performance.mark/measure (Safari 10)
        // because the mark/measure APIs are designed to write entries to a buffer in the browser that does not exist,
        // simply stub the implementations out.
        // TODO(STENCIL-323): Remove this patch when support for older browsers is removed (breaking)
        // @ts-ignore
        performance.mark = performance.measure = () => {
            /*noop*/
        };
        performance.getEntriesByName = () => [];
    }
    // @ts-ignore
    const scriptElm = BUILD.scriptDataOpts || BUILD.safari10 || BUILD.dynamicImportShim
        ? Array.from(doc.querySelectorAll('script')).find((s) => new RegExp(`\/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) ||
            s.getAttribute('data-stencil-namespace') === NAMESPACE)
        : null;
    const importMeta = import.meta.url;
    const opts = BUILD.scriptDataOpts ? scriptElm['data-opts'] || {} : {};
    if (BUILD.safari10 && 'onbeforeload' in scriptElm && !history.scrollRestoration /* IS_ESM_BUILD */) {
        // Safari < v11 support: This IF is true if it's Safari below v11.
        // This fn cannot use async/await since Safari didn't support it until v11,
        // however, Safari 10 did support modules. Safari 10 also didn't support "nomodule",
        // so both the ESM file and nomodule file would get downloaded. Only Safari
        // has 'onbeforeload' in the script, and "history.scrollRestoration" was added
        // to Safari in v11. Return a noop then() so the async/await ESM code doesn't continue.
        // IS_ESM_BUILD is replaced at build time so this check doesn't happen in systemjs builds.
        return {
            then() {
                /* promise noop */
            },
        };
    }
    if (!BUILD.safari10 && importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    else if (BUILD.dynamicImportShim || BUILD.safari10) {
        opts.resourcesUrl = new URL('.', new URL(scriptElm.getAttribute('data-resources-url') || scriptElm.src, win.location.href)).href;
        if (BUILD.dynamicImportShim) {
            patchDynamicImport(opts.resourcesUrl, scriptElm);
        }
        if (BUILD.dynamicImportShim && !win.customElements) {
            // module support, but no custom elements support (Old Edge)
            // @ts-ignore
            return import(/* webpackChunkName: "polyfills-dom" */ './dom-0440435d.js').then(() => opts);
        }
    }
    return promiseResolve(opts);
};
const patchDynamicImport = (base, orgScriptElm) => {
    const importFunctionName = getDynamicImportFunction(NAMESPACE);
    try {
        // test if this browser supports dynamic imports
        // There is a caching issue in V8, that breaks using import() in Function
        // By generating a random string, we can workaround it
        // Check https://bugs.chromium.org/p/chromium/issues/detail?id=990810 for more info
        win[importFunctionName] = new Function('w', `return import(w);//${Math.random()}`);
    }
    catch (e) {
        // this shim is specifically for browsers that do support "esm" imports
        // however, they do NOT support "dynamic" imports
        // basically this code is for old Edge, v18 and below
        const moduleMap = new Map();
        win[importFunctionName] = (src) => {
            const url = new URL(src, base).href;
            let mod = moduleMap.get(url);
            if (!mod) {
                const script = doc.createElement('script');
                script.type = 'module';
                script.crossOrigin = orgScriptElm.crossOrigin;
                script.src = URL.createObjectURL(new Blob([`import * as m from '${url}'; window.${importFunctionName}.m = m;`], {
                    type: 'application/javascript',
                }));
                mod = new Promise((resolve) => {
                    script.onload = () => {
                        resolve(win[importFunctionName].m);
                        script.remove();
                    };
                });
                moduleMap.set(url, mod);
                doc.head.appendChild(script);
            }
            return mod;
        };
    }
};
const patchCloneNodeFix = (HTMLElementPrototype) => {
    const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
    HTMLElementPrototype.cloneNode = function (deep) {
        if (this.nodeName === 'TEMPLATE') {
            return nativeCloneNodeFn.call(this, deep);
        }
        const clonedNode = nativeCloneNodeFn.call(this, false);
        const srcChildNodes = this.childNodes;
        if (deep) {
            for (let i = 0; i < srcChildNodes.length; i++) {
                // Node.ATTRIBUTE_NODE === 2, and checking because IE11
                if (srcChildNodes[i].nodeType !== 2) {
                    clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
                }
            }
        }
        return clonedNode;
    };
};

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["doogma-checkbox-counter-group",[[0,"doogma-checkbox-counter-group",{"label":[1025],"labelPlacement":[1025,"label-placement"],"hideLabel":[1025,"hide-label"],"groupParam":[1025,"group-param"],"param":[1025],"defaultParamValue":[1032,"default-param-value"],"gap":[1025],"items":[1032],"itemsPlacement":[1025,"items-placement"],"itemsArray":[32],"classes":[32]}]]],["doogma-checkbox-group",[[0,"doogma-checkbox-group",{"label":[1025],"labelPlacement":[1025,"label-placement"],"hideLabel":[1025,"hide-label"],"groupParam":[1025,"group-param"],"param":[1025],"defaultParamValue":[1032,"default-param-value"],"gap":[1025],"items":[1032],"itemsPlacement":[1025,"items-placement"],"itemsArray":[32],"classes":[32]}]]],["doogma-color-swatches",[[0,"doogma-color-swatches",{"label":[1025],"labelPlacement":[1025,"label-placement"],"hideLabel":[1025,"hide-label"],"param":[1025],"size":[1025],"circular":[1025],"gap":[1025],"items":[1032],"itemsPlacement":[1025,"items-placement"],"showActiveSelection":[1025,"show-active-selection"],"activeSelection":[32],"itemsArray":[32],"classes":[32]},[[4,"doogmaColorSwatchComponentUpdated","listenDoogmaColorSwatchComponentUpdate"]]]]],["doogma-component-containers",[[0,"doogma-component-containers",{"param":[1025],"class":[1025],"items":[1032],"itemsArray":[32],"classes":[32],"zoomInputs":[32]}]]],["doogma-font-swatches",[[0,"doogma-font-swatches",{"label":[1025],"labelPlacement":[1025,"label-placement"],"param":[1025],"size":[1025],"circular":[1025],"gap":[1025],"backColor":[1025,"back-color"],"frontColor":[1025,"front-color"],"items":[1032],"itemsPlacement":[1025,"items-placement"],"showActiveSelection":[1025,"show-active-selection"],"name":[1025],"activeSelection":[32],"itemsArray":[32],"classes":[32]},[[4,"doogmaFontSwatchComponentUpdated","listenDoogmaFontSwatchComponentUpdated"]]]]],["doogma-image-swatches",[[0,"doogma-image-swatches",{"label":[1025],"labelPlacement":[1025,"label-placement"],"hideLabel":[1025,"hide-label"],"param":[1025],"size":[1025],"circular":[1025],"gap":[1025],"items":[1032],"itemsPlacement":[1025,"items-placement"],"showActiveSelection":[1025,"show-active-selection"],"activeSelection":[32],"swatchesArr":[32],"classes":[32]},[[4,"doogmaImageSwatchComponentUpdated","listenDoogmaImageSwatchComponentUpdate"]]]]],["doogma-nav-controls",[[0,"doogma-nav-controls",{"param":[1025],"defZoomX":[1025,"def-zoom-x"],"defZoomY":[1025,"def-zoom-y"],"defZoomHeight":[1025,"def-zoom-height"],"defZoomWidth":[1025,"def-zoom-width"],"viewType":[1025,"view-type"],"display":[1025],"class":[1025],"items":[1032],"itemsArray":[32],"classes":[32]}]]],["doogma-nav-tabs",[[0,"doogma-nav-tabs",{"param":[1025],"viewType":[1025,"view-type"],"maxWidth":[1025,"max-width"],"hideTabs":[1025,"hide-tabs"],"enableZoom":[1025,"enable-zoom"],"class":[1025],"items":[1032],"itemsArray":[32],"classes":[32],"zoomInputs":[32]}]]],["doogma-radio-group",[[0,"doogma-radio-group",{"label":[1025],"labelPlacement":[1025,"label-placement"],"hideLabel":[1025,"hide-label"],"groupParam":[1025,"group-param"],"param":[1025],"gap":[1025],"items":[1032],"itemsPlacement":[1025,"items-placement"],"itemsArray":[32],"activeSelection":[32],"classes":[32]},[[4,"doogmaRadioSwatchComponentUpdated","listenDoogmaRadioSwatchComponentUpdated"]]]]],["doogma-add-to-cart-button",[[0,"doogma-add-to-cart-button",{"label":[1025],"backgroundColor":[1025,"background-color"],"color":[1025],"classes":[32]}]]],["doogma-counterbox",[[0,"doogma-counterbox",{"label":[1025],"labelPlacement":[1025,"label-placement"],"hideLabel":[1025,"hide-label"],"placeholder":[1025],"param":[1025],"name":[1025],"value":[1026],"type":[1025],"iconStart":[1025,"icon-start"],"iconEnd":[1025,"icon-end"],"min":[1026],"max":[1026],"step":[1026],"velocity":[1026],"classes":[32],"controlClasses":[32],"interval":[32]},[[4,"doogmaParametersChangeOut","listenDoogmaParametersChangeOut"]]]]],["doogma-custom-scripts",[[0,"doogma-custom-scripts",{"items":[1032],"label":[1025]}]]],["doogma-download-button",[[0,"doogma-download-button",{"label":[1025],"hideLabel":[1025,"hide-label"],"labelDownloadButton":[1025,"label-download-button"],"shapeDownloadButton":[1025,"shape-download-button"],"iconDownloadButton":[1025,"icon-download-button"],"classes":[32],"buttonClasses":[32],"downloadUrl":[32]}]]],["doogma-fullscreen-button",[[0,"doogma-fullscreen-button",{"selector":[1025],"shape":[1025],"direction":[1025],"icon":[1025],"iconCloseModal":[1025,"icon-close-modal"],"classes":[32],"buttonClasses":[32],"showModal":[32],"imgUrl":[32],"modalId":[32]}]]],["doogma-html-section",[[0,"doogma-html-section",{"content":[1025],"class":[1025]}]]],["doogma-select",[[0,"doogma-select",{"label":[1025],"labelPlacement":[1025,"label-placement"],"hideLabel":[1025,"hide-label"],"param":[1025],"name":[1025],"defaultParamValue":[1032,"default-param-value"],"value":[1025],"dataIdentifier":[1025,"data-identifier"],"items":[1032],"classes":[32],"controlClasses":[32],"optionsArr":[32],"activeSelection":[32]},[[4,"doogmaParametersChangeOut","listenDoogmaParametersChangeOut"],[4,"doogmaSelectComponentUpdated","listenDoogmaSelectComponentUpdated"]]]]],["doogma-share-button",[[0,"doogma-share-button",{"label":[1025],"hideLabel":[1025,"hide-label"],"labelShareButton":[1025,"label-share-button"],"shapeShareButton":[1025,"shape-share-button"],"iconShareButton":[1025,"icon-share-button"],"iconCloseModal":[1025,"icon-close-modal"],"labelHeaderModal":[1025,"label-header-modal"],"labelButtonCta":[1025,"label-button-cta"],"labelButtonCtaClicked":[1025,"label-button-cta-clicked"],"labelButtonCtaTimeOut":[1026,"label-button-cta-time-out"],"classes":[32],"buttonClasses":[32],"showModal":[32],"imgUrl":[32]},[[16,"click","handleBodyClick"]]]]],["doogma-simple-text",[[0,"doogma-simple-text",{"label":[1025],"labelPlacement":[1025,"label-placement"],"hideLabel":[1025,"hide-label"],"placeholder":[1025],"param":[1025],"name":[1025],"value":[1025],"type":[1025],"classes":[32],"controlClasses":[32]},[[4,"doogmaParametersChangeOut","listenDoogmaParametersChangeOut"]]]]],["doogma-style",[[0,"doogma-style",{"internal":[1025],"external":[1025]}]]],["doogma-wrapper",[[4,"doogma-wrapper",{"visId":[1025,"vis-id"],"initConfig":[1025,"init-config"],"maxWidth":[1025,"max-width"],"ratio":[1025],"ratios":[1025],"gutter":[1025],"topOffset":[1025,"top-offset"],"topOffsets":[1025,"top-offsets"],"class":[1025],"classes":[32],"ratiosObj":[32],"topOffsetsObj":[32]}]]],["my-component",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["doogma-checkbox",[[0,"doogma-checkbox",{"groupParam":[1025,"group-param"],"param":[1025],"defaultParamValue":[1032,"default-param-value"],"name":[1025],"value":[1025],"label":[1025],"gap":[1025],"selected":[1025],"image":[1032],"class":[32],"defParamVal":[32]},[[4,"doogmaParametersChangeOut","listenDoogmaParametersChangeOut"]]]]],["doogma-checkbox-counter",[[0,"doogma-checkbox-counter",{"groupParam":[1025,"group-param"],"param":[1025],"countParam":[1025,"count-param"],"defaultParamValue":[1032,"default-param-value"],"name":[1025],"value":[1025],"label":[1025],"placeholder":[1025],"type":[1025],"icon":[1025],"span":[1025],"gap":[1025],"selected":[1025],"iconStart":[1025,"icon-start"],"iconEnd":[1025,"icon-end"],"min":[1026],"max":[1026],"step":[1026],"velocity":[1026],"image":[1032],"customParameters":[1040],"class":[32],"defParamVal":[32],"interval":[32],"controlClasses":[32]},[[4,"doogmaParametersChangeOut","listenDoogmaParametersChangeOut"]]]]],["doogma-color-swatch",[[0,"doogma-color-swatch",{"param":[1025],"name":[1025],"label":[1025],"value":[1025],"size":[1025],"circular":[1025],"gap":[1025],"selected":[1025],"isActive":[32],"class":[32],"classes":[32]},[[4,"doogmaColorSwatchComponentUpdated","listenDoogmaColorSwatchComponentUpdated"],[4,"doogmaParametersChangeOut","listenDoogmaParametersChangeOut"]]]]],["doogma-component-container",[[0,"doogma-component-container",{"name":[1025],"param":[1025],"index":[1025],"slug":[1025],"image":[1025],"isActive":[32]}]]],["doogma-font-swatch",[[0,"doogma-font-swatch",{"param":[1025],"name":[1025],"label":[1025],"value":[1025],"size":[1025],"circular":[1025],"gap":[1025],"backColor":[1025,"back-color"],"frontColor":[1025,"front-color"],"selected":[1025],"isActive":[32],"class":[32],"classes":[32]},[[4,"doogmaFontSwatchComponentUpdated","listenDoogmaFontSwatchComponentUpdated"],[4,"doogmaParametersChangeOut","listenDoogmaParametersChangeOut"]]]]],["doogma-image-swatch",[[1,"doogma-image-swatch",{"param":[1025],"name":[1025],"value":[1025],"src":[1025],"size":[1025],"circular":[1025],"gap":[1025],"selected":[1025],"label":[1025],"isActive":[32],"classes":[32]},[[4,"doogmaImageSwatchComponentUpdated","listenDoogmaColorSwatchComponentUpdated"],[4,"doogmaParametersChangeOut","listenDoogmaParametersChangeOut"]]]]],["doogma-nav-control",[[0,"doogma-nav-control",{"param":[1025],"label":[1025],"zoomX":[1025,"zoom-x"],"zoomY":[1025,"zoom-y"],"zoomHeight":[1025,"zoom-height"],"zoomWidth":[1025,"zoom-width"],"viewType":[1025,"view-type"],"controlsNav":[1025,"controls-nav"],"class":[1025],"controlId":[1,"control-id"],"selected":[1025],"isActive":[32],"classes":[32],"zoomInputs":[32]},[[4,"doogmaNavControlComponentUpdated","listenDoogmaNavControlComponentUpdated"]]]]],["doogma-nav-tab",[[0,"doogma-nav-tab",{"name":[1025],"param":[1025],"index":[1025],"slug":[1025],"selected":[1025],"image":[1025],"isActive":[32]}]]],["doogma-radio",[[0,"doogma-radio",{"groupParam":[1025,"group-param"],"param":[1025],"name":[1025],"value":[1025],"label":[1025],"gap":[1025],"selected":[1025],"multiText":[1025,"multi-text"],"customtitle":[1025],"body":[1040],"customParameters":[1040],"class":[32],"classes":[32],"isActive":[32]},[[4,"doogmaRadioSwatchComponentUpdated","listenDoogmaRadioSwatchComponentUpdated"],[4,"doogmaParametersChangeOut","listenDoogmaParametersChangeOut"]]]]]], options);
});
