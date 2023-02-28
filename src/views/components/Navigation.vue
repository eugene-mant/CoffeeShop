<styles lang="scss">

    $nav-item-space-between: .5em;

    .main-nav {
        display: flex;
        margin: auto 2rem auto 0;
        justify-content: right;
        flex: 1;

        a {
            display: block;
            font-size: 1em;
            padding: .4em .4em;
            color: black;
            text-decoration: none;
            
            &.router-link-active {
                border-radius: 2rem;
                color: white;
                background: rgb(104, 196, 238);  
            }

            &:not(:last-child) {
                margin-right: $nav-item-space-between;
            }
        }

        .search {
            width: 20em;
            height: 2em;
        }

    }
</styles>

<template>
    <div class="main-nav">
        <router-link to="/">Home</router-link>
        <router-link to="/menu">Menu</router-link>
        <router-link to="/about">About</router-link>
        <in-dev class="search" type="component" title="Пошук" />
    </div>
    
</template>