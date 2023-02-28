<styles lang="scss" scoped>
    .in-dev-msg {
        color: #666;

        .frame-box {
            width: 100%;
            height: 100%;
            margin: auto;
            position: relative;
            z-index: 9;
            padding: 1em;
            border-radius: .8em;
            background-color: #c9c9c9;
            

            overflow: hidden;
            &:hover {
                overflow: visible;
            }

        }
        .group-box {
            flex: 1;
            padding: 1em;
            border-radius: .8em;

            background: repeating-linear-gradient(
            -55deg,
            #ccc,
            #ccc 10px,
            #ddd 10px,
            #ddd 20px
            );
        }

        &.page {
            .frame-box {
                width: 40%;
                height: 30vh;

                .btn-back {
                    width: max-content;
                    margin: 0 auto;
                    padding: 1em;
                    cursor: pointer;
                }
            }
        }

        .title  {
            font-size: 1.6em;
        }
        .msg {
            font-size: 2em;
            margin: auto;
            //padding: 1em;
        }
    }
</styles>

<template>
    <div :class="'in-dev-msg ' + type">
        <div class="frame-box v-box">
            <div class="group-box v-box">
                <div class="title">{{fullTitle}}</div>
                <div class="msg">{{msg}}</div>
                <template v-if="type == 'page'">
                    <div class="u-btn btn-back" @click="$router.go(-1)">{{backMsg}}</div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: 'view',
        title: ''
    },
    data: () => ({
        msg: 'В розробці...',
        backMsg: 'Назад'
    }),
    computed: {
        fullTitle() {
            switch(this.type) {
                case 'view': return `В\'юшка "${this.title}"`;
                case 'page': return `Сторінка "${this.title}"`;
                case 'component': return `Компонент "${this.title}"`;
            }
        }
    }
}
</script>