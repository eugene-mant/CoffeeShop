<style lang="scss">
$nav-item-font-size: 1rem;
$nav-item-space-between: $nav-item-font-size * .75;
$color: #444;
$select-color: $color-simple-blue;
$select-line-height: 2px;

.main-top-nav {
    display: flex;
    justify-content: right;

    .main-top-nav-item {
        position: relative;
        display: flex;
        font-weight: 300;
        color: $color;
        text-decoration: none;
        height: 100%;
        min-width: $nav-item-font-size * 3;
        font-size: $nav-item-font-size * 1.2;
        
        & > .title {
            cursor: pointer;
            margin: auto;
            position: relative;
            bottom: $select-line-height;
        }
        &.router-link-active {
            color: $select-color; 
            
            &::after {
                content: " ";
                position: absolute;
                bottom: $select-line-height;
                left: 0;
                width: 100%;
                height: $select-line-height;
                @include backgroundLines(-55deg, $select-color, #ededed, 5px);
            }
        }
        &:not(:last-child) {
            margin-right: $nav-item-space-between;
        }

        &.sub-item {
            margin-right: 0;
            padding: $nav-item-font-size / 2;
            & > .title {
                margin: auto 0;
                bottom: 0;
            }
            &:hover {
                color: #fff;
                background-color: $select-color;
            }
        }

        
        & > .sub-items-container-wrapper {
            position: absolute;
            right: 0;
            top: 100%;
            z-index: 3;
            display: none;

            .sub-items-container {
                background: #ededed; // tmp
                width: max-content; // tmp
                margin-top: $v-space-m / 2;
                border-radius: $def-block-border-radius;
                overflow: hidden;
            }
        }
        &:hover > .sub-items-container-wrapper {
            display: block;
        }
    }
}
</style>

<template>
    <nav class="main-top-nav">
        <!-- template не буде відображатись -->
        <template v-for="(item, i) in navItems" >
            <router-link v-if="item.link" :to="item.link" :key="i+'-1'"
                class="main-top-nav-item">
                <span class="title">{{item.title}}</span>
            </router-link>

            <div v-else class="main-top-nav-item" :key="i+'-2'">
                <span class="title">{{item.title}}</span>
                <!-- 
                    просто демо
                    реалізовуємо відображення children-елементів
                    якщо вкладень багато, треба розбити на пару компонентів типу 
                            Navigation
                            NavItemsList
                            NavItem

                    тоді, можна буде рекурсивно відображати будь-яку кількість вкладень
                -->
                <div v-if="item.items && item.items.length > 0" class="sub-items-container-wrapper">
                    <div class="sub-items-container">
                        <template v-for="(chItem, i) in item.items">
                            <router-link v-if="chItem.link" :to="chItem.link" :key="i+'-1'"
                                class="main-top-nav-item sub-item">
                                <span class="title">{{chItem.title}}</span>
                            </router-link>

                            <div v-else class="main-top-nav-item sub-item" :key="i+'-2'">
                                <span class="title">{{chItem.title}}</span>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </template>
    </nav>
</template>

<script>
const items = [
    { link: '/menu', title: 'Меню' },
    { link: '/about', title: 'Про нас' },
    { link: false, title: '...', items: [
            { link: '/test', title: 'Тестовий каталог' },
            { link: '/demo', title: 'Стара демка' },
            { link: '/about/faq', title: 'FAQ' },
        ] 
    }
];

export default {
    data: () => ({
        navItems: items
    }),
}
</script>