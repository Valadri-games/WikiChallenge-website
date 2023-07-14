<template>
    <div id="wiki-view" class="overflow-y-auto overflow-x-hidden w-full h-full justify-between">
        <div id="wikipedia-content" class="wikipedia-content mw-content-ltr sitedir-ltr ltr mw-body-content parsoid-body mediawiki mw-parser-output content article-end-marker wiki-insert" v-html="html"></div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { storeToRefs } from 'pinia';

    import router from '@/router/router';

    import { useGeneralStore } from "@/stores/general";
    import { useSoloModeStore } from '@/stores/soloMode';

    const emit = defineEmits(['loading', 'loaded', 'win', 'pageNotFound']);

    const generalStore = useGeneralStore();
    const soloModeStore = useSoloModeStore();
    const { currentPage, pagesPath, endPage, gameStartDate, gameTimerPauses, gameStarted, gameEnded, totalTime, steps } = storeToRefs(soloModeStore);

    const html = ref("");

    let clics = 0;

    function initView() {
        if(gameStarted.value == false && gameEnded.value == false) {
            gameStartDate.value = Date.now() + 2000;
            gameTimerPauses.value = [];
            pagesPath.value = [];
        }

        loadPageContent(currentPage.value);
    }

    async function loadPageContent(pageName: string) {
        emit('loading');

        let apiUrl = "";
        if(generalStore.showMobile) apiUrl = `https://fr.wikipedia.org/w/api.php?action=parse&format=json&origin=*&curtimestamp=1&page=${pageName}&redirects=1&prop=images%7Ctext%7Ccategorieshtml%7Ccategories%7Cdisplaytitle%7Cproperties&disableeditsection=1&useskin=vector-2022&mobileformat=1&utf8=1&ascii=1&formatversion=2`
        else apiUrl = `https://fr.wikipedia.org/w/api.php?action=parse&format=json&origin=*&curtimestamp=1&page=${pageName}&redirects=1&prop=images%7Ctext%7Ccategorieshtml%7Ccategories%7Cdisplaytitle%7Cproperties&disableeditsection=1&useskin=vector-2022&utf8=1&ascii=1&formatversion=2`
        
        let wikiData = await fetch(apiUrl).then((data) => {
            return data.json();
        }).then((data) => {
            return data;
        }).catch((e) => {
            console.log("error");
        });

        if(wikiData.error) {
            loadingError();
            return;
        }

        let parsedData = parseWikiData(wikiData);
        html.value = parsedData.parse.text;

        if(gameEnded.value == false) {
            gameTimerPauses.value.push(Date.now());
        }

        clics += 1;
        if(endPage.value == currentPage.value || (window.location.hostname == "localhost" && clics == 4)) win();
        else emit('loaded');
    }

    function parseWikiData(data: any) {
        data.parse.text = data.parse.text.replaceAll('noscript', 'div');
        data.parse.text = data.parse.text.replaceAll('lazy-image-placeholder', 'lazy-image-placeholder hidden');

        data.parse.text = data.parse.text.replaceAll('/w/extensions/', 'https://fr.m.wikipedia.org/w/extensions/');

        return data;
    }

    function loadingError() {
        if(pagesPath.value.length == 0) {
            router.go(-1);
            return;
        }

        steps.value -= 1;
        currentPage.value = pagesPath.value[pagesPath.value.length - 1];
        pagesPath.value.pop();

        emit('pageNotFound');
        loadPageContent(currentPage.value);
    }

    function win() {
        if(gameEnded.value == false) {
            gameStarted.value = false;
            gameEnded.value = true;

            pagesPath.value.push(endPage.value);
            gameTimerPauses.value.push(Date.now());

            soloModeStore.win();

            emit('win');
        }
    }

    onMounted(() => {
        initView();

        // @ts-ignore
        document.getElementById('wikipedia-content').addEventListener('click', async (e: any) => {
            e.preventDefault();

            if(gameEnded.value == false) {
                if(e.target.tagName == "a" || e.target.tagName == "A") {
                    html.value = "";

                    steps.value += 1;
                    pagesPath.value.push(currentPage.value);
                    currentPage.value = decodeURI(e.target.href).split('/')[4];

                    gameTimerPauses.value.push(Date.now());
                    await loadPageContent(currentPage.value);
                    
                    // @ts-ignore
                    document.getElementById('wiki-view').scrollTo(0,0);
                }
            }
        });
    });
</script>

<style>
    @import "@/assets/css/wiki-common.css";
    @import "@/assets/css/wiki-vec2.css";

    .wikipedia-content {
        font-family: -apple-system,'BlinkMacSystemFont','Segoe UI','Roboto','Inter','Helvetica','Arial',sans-serif;
        font-size: 16px;
        line-height: 24px;
        background-color: white;
    }

    /* Wiki css patch */

    .mw-parser-output {
        padding: 4px;
        margin-top: -4px;
    }

    .mw-empty-elt {
        display: none;
    }

    .ib-settlement-cols-cell a {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .ib-settlement-cols-cell {
        justify-content: space-between;
    }

    .ib-settlement-cols-cell .ib-settlement-caption-link {
        margin-top: 10px;
    }

    .infobox-full-data .ib-settlement-caption {
        margin-top: 3px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        gap: 5px;
        justify-content: center;
    }

    .infobox-full-data a {
        display: flex;
        justify-content: center;
    }

    .infobox-below ul {
        margin: 0px;
        list-style: inside;
    }

    .wikipedia-content div ol {
        list-style: decimal;
    }

    .wikipedia-content div ul {
        list-style: inside;
    }

    .wikipedia-content div.thumb  {
        margin-top: 0px;
        margin-bottom: 10px;
    }

    @media screen and (max-width: 799px) {
        div.thumb  {
            float: none;
            display: flex;
            justify-content: center;
            margin: 10px;
        }
    }

    .mf-section-3 {
        overflow-x: auto;
        width: 100%;
        position: relative;
    }

    .wikipedia-content ul.gallery {
        list-style: none;
        margin: 0px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        flex-direction: row;
        column-gap: 15px;
    }

    .gallerycaption {
        text-align: center;
        font-weight: bold;
    }

    .wikipedia-content ul.gallery li:first-child {
        display: block;
        width: 100%;
    }

    .gallerybox {
        margin: 0px;
        text-align: center;
        margin-top: 10px;
    }

    .gallerybox .thumb {
        margin: 0px;
    }

    @media screen and (max-width: 799px) {
        ul.gallery {
            margin: 0px;
            display: flex;
            align-items: center;
            flex-direction: column;
        }

        ul.gallery div:first-child {
            display: block;
        }

        .gallerybox {
            margin: 0px;
            text-align: center;
            margin-top: 10px;
        }

        .gallerybox .thumb {
            margin: 0px;
        }
    }

    .mw-headline {
        font-weight: bold;
    }

    .section-heading .mw-headline, h2 .mw-headline {
        font-weight: normal;
        font-size: 28px;
    }

    .hatnote {
        background-color: #AAAAAA22;
        padding: 10px;
        margin-top: 10px;
        padding-left: 10px !important;
    }

    @media screen and (max-width: 799px) {
        .wikipedia-content table.box-More_citations_needed {
            width: 100%;
            margin: 0px;
            margin-bottom: 10px;
        }
    }

    .box-More_citations_needed {
        display: none;
    }

    .div-col ul {
        margin-left: 5px;
    }

    .div-col ul li {
        margin-top: 10px;
    }

    .mw-references-wrap .references {
        margin-left: 35px;
    }

    .collapsible-block ul {
        margin-left: 5px !important;
    }

    .side-box-flex {
        display: flex;
        flex-direction: column;
        padding: 5px;
    }

    .side-box-flex .side-box-image {
        margin: auto;
        margin-bottom: 10px;
    }

    .wikipedia-content .images {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .noprint {
        display: none;
    }

    .flagicon {
        display: inline-block
    }

    .wikipedia-content table {
        margin-bottom: 15px;
    }

    .wikipedia-content table tbody tr th {
        text-align: left !important;
    }

    .hr {
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .bandeau-portail-icone {
        display: inline-block;
    }

    .external {
        opacity: 0.6;
        pointer-events: none;
    }

    .wikipedia-content a[href*="#"] {
        display: none;
    }

    .wikipedia-content .wikitable {
        display: block;
        overflow-x: auto;
        white-space: nowrap;
    }

    .bandeau-niveau-modere {
        display: none;
    }

    .mw-empty-elt {
        display: none;
    }

    .wikipedia-content table[style*="width:100%"] {
        width: 100%;
        display: flex;
    }

    .wikipedia-content table[style*="width:100%"] tbody {
        width: 100%;
    }

    .wikipedia-content table[style*="width:100%"] tbody tr {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .wikipedia-content table[style*="width:100%"] tbody tr td {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .wikipedia-content table[style*="width:100%"] tbody tr td a {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .entete {
        padding: 8px;
    }

    small {
        display: flex;
        flex-direction: column;
    }

    time {
        display: inline-block;
    }

    small {
        display: inline-block;
    }

    .collapsible-block {
        height: 0px;
        overflow-x: hidden;
    }

    caption {
        margin-top: 5px;
        margin-bottom: 5px;
        padding: 8px;
        background-color: #e0e0e0 !important;
    }

    .infobox_v3 .entete, .infobox_v2 .entete {
        background-color: #e0e0e0 !important;
        font-size: 20px;
        line-height: 20px;
        text-align: center;
        padding: 10px;
        color: black !important;
    }

    .infobox_v3, .infobox_v2 {
        margin-top: 10px;
        background-color: #f9f9f9 !important;
    }

    .legend {
        text-align: center;
    }

    .infobox_v3 table, .infobox_v2 table {
        margin-left: 10px;
        margin-right: 10px;
    }

    .infobox_v3 table tr td div, .infobox_v2  table tr td div {
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .images[style*="padding-top:25px"] {
        padding-top: 0px !important;
    }

    blockquote {
        background-color: #f9f9f9 !important;
    }

    blockquote p {
        padding: 10px;
        margin-left: -30px !important;
        margin-right: -30px !important;
    }
</style>