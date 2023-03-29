<style lang="scss">
.v-tmpl-drop-down {
    display:inline-flex;
    position: relative;
    width: auto;
    height: auto;

    .v-tdd-btn {
        display:inline-flex;
        width: auto;
        height: auto;
        position: relative;
        z-index:2;
    }

    .v-tdd-content {
        position:absolute;
        right: 0;
        top: 100%;
        z-index:1;
        min-width: 100%;
    }
}
</style>

<template>
    <div class="v-tmpl-drop-down">
        <span class="v-tdd-btn" ref="btn">
            <slot name="button" ></slot>
        </span>
        <div class="v-tdd-content" ref="content" v-if="isActive">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
const hasParent = (el, parentEl) => {
    if(!el || !parentEl) return false
    if(el === parentEl) return true;

    let node = el, res = false;
    do {
        node = node.parentElement;
        res = (node === parentEl);
    } while(node && !res);

    return res;
}

export default {
    name: 'TmplDropDown',
    props: [],
    data: () => ({
        isActive: false
    }),
    methods: {
        onClickPage(e) {
            e.stopPropagation();

            if(hasParent(e.target, this.$refs.btn)) {
                this.isActive = !this.isActive;
                return;
            }
            if(this.isActive) {
                if(!hasParent(e.target, this.$refs.content)) {
                    this.isActive = false;
                }
            }
        }
    },
    created() {
        document.addEventListener('click', this.onClickPage);
    },
    unmounted() {
        document.removeEventListener('click', this.onClickPage);
    }
}
</script>