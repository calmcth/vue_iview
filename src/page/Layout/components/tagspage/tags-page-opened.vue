<style lang="less">
    @import "../../../../style/layout.less";
</style>

<template>
    <div ref="scrollCon" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll" class="tags-outer-scroll-con">
        <div class="close-all-tag-con">
            <Dropdown transfer @on-click="handleTagsOption">
                <Button size="small" type="primary">
                    {{ $t("layout.tagSelect") }}
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem name="clearAll">{{ $t("layout.closeAll") }}</DropdownItem>
                    <DropdownItem name="clearOthers">{{ $t("layout.closeOthers") }}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <div ref="scrollBody" class="tags-inner-scroll-body" :style="{left: tagBodyLeft + 'px'}">
            <transition-group name="taglist-moving-animation">
                <Tag
                    style="height: 28px;line-height: 28px;margin: 0 4px; "
                    v-for="(item, index) in pageTagsList" 
                    ref="tagsPageOpened"
                    :key="index"
                    :name="item.path"
                    @on-close="closePage"
                    @click.native="linkTo(item)"
                    :closable="item.name==='/homeManage'?false:true"
                    :color="item.path===currentPageName?'blue':'default'"
                >{{ itemTitle(item) }}</Tag>
            </transition-group>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import {Tool} from 'utilities/index';
export default {
    name: 'tagsPageOpened',
    data () {
        return {
            currentPageName: this.$route.path,
            tagBodyLeft: 0,
            refsTag: [],
            tagsCount: 1
        };
    },
    props: {
        pageTagsList: Array,
        beforePush: {
            type: Function,
            default: (item) => {
                return true;
            }
        }
    },
    computed: {
        title () {
            return this.$store.state.app.currentTitle;
        },
        tagsList () {
            return this.$store.state.app.pageOpenedList;
        }
    },
    methods: {
        itemTitle (item) {
            if(this.$t('navListName.'+item.title).indexOf(".")===-1){
                return this.$t('navListName.'+item.title);
            }else{
                return this.$t(item.title)
            }
        },
        /**
         * 关闭单个标签页
         * @param event
         * @param path
         */
        closePage (event, path) {
            if(path!==this.$store.state.app.disableClosePath){
                let pageOpenedList = this.$store.state.app.pageOpenedList;
                let lastPageObj = pageOpenedList[0];
                if (this.currentPageName === path) {
                    let len = pageOpenedList.length;
                    for (let i = 1; i < len; i++) {
                        if (pageOpenedList[i].path === path) {
                            if (i < (len - 1)) {
                                lastPageObj = pageOpenedList[i + 1];
                            } else {
                                lastPageObj = pageOpenedList[i - 1];
                            }
                            break;
                        }
                    }
                }
                this.$store.dispatch('app/removeTag',path);
                if (this.currentPageName === path) {
                    this.linkTo(lastPageObj);
                }
            }
        },
        linkTo (item) {
            let routerObj = {};
            routerObj.name = item.name;
            if (item.argu) {
                routerObj.params = item.argu;
            }
            if (item.query) {
                routerObj.query = item.query;
            }
            if (this.beforePush(item)) {
                Tool.push(item)
            }
        },
        /**
         * 滚动事件
         * @param e
         */
        handlescroll (e) {
            var type = e.type;
            let delta = 0;
            if (type === 'DOMMouseScroll' || type === 'mousewheel') {
                delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40;
            }
            let left = 0;
            if (delta > 0) {
                left = Math.min(0, this.tagBodyLeft + delta);
            } else {
                if (this.$refs.scrollCon.offsetWidth - 100 < this.$refs.scrollBody.offsetWidth) {
                    if (this.tagBodyLeft < -(this.$refs.scrollBody.offsetWidth - this.$refs.scrollCon.offsetWidth + 100)) {
                        left = this.tagBodyLeft;
                    } else {
                        left = Math.max(this.tagBodyLeft + delta, this.$refs.scrollCon.offsetWidth - this.$refs.scrollBody.offsetWidth - 100);
                    }
                } else {
                    this.tagBodyLeft = 0;
                }
            }
            this.tagBodyLeft = left;
        },
        handleTagsOption (type) {
            if (type === 'clearAll') {//关闭全部标签
                this.$store.dispatch('app/clearAllTags');
                Tool.push(this.$store.state.app.pageOpenedList[0])
            } else {//关闭其他标签
                this.$store.dispatch('app/clearOtherTags',this.$route);
                //Tool.push({path:this.$route.path})
            }
            this.tagBodyLeft = 0;
        },
        moveToView (tag) {//根据不同的标签进行滚动
            if (tag.offsetLeft < -this.tagBodyLeft) {
                // 标签在可视区域左侧
                this.tagBodyLeft = -tag.offsetLeft + 10;
            } else if (tag.offsetLeft + 10 > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + this.$refs.scrollCon.offsetWidth - 100) {
                // 标签在可视区域
            } else {
                // 标签在可视区域右侧
                this.tagBodyLeft = -(tag.offsetLeft - (this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth) + 20);
            }
        }
    },
    mounted () {
        this.refsTag = this.$refs.tagsPageOpened;
        if(this.refsTag!==undefined){
            setTimeout(() => {
                this.refsTag.forEach((item, index) => {
                    if (this.$route.name === item.name) {
                        let tag = this.refsTag[index].$el;
                        this.moveToView(tag);
                    }
                });
            }, 1);  // 这里不设定时器就会有偏移bug
            this.tagsCount = this.tagsList.length;
        }

    },
    watch: {
        '$route' (to) {
            this.currentPageName = to.path;
            this.$nextTick(() => {
                this.refsTag.forEach((item, index) => {
                    if (to.path === item.name) {
                        let tag = this.refsTag[index].$el;
                        this.moveToView(tag);
                    }
                });
            });
            this.tagsCount = this.tagsList.length;
        }
    },
    created(){
        //console.log(this.pageTagsList)
    }
};
</script>
