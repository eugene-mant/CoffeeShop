<styles lang="scss">
    .main-nav {
        a {
            font-size: 1.4em;
            margin-right: 1em;
            padding: .4em .8em;
            color: black;
            text-decoration: none;

            &:last-child {
                margin-right: 0;
            }
            &.router-link-active {
                border-radius: 2rem;
                color: white;
                background: rgb(104, 196, 238);  
            }
        }

    }
</styles>

<template>
    <div class="main-nav">
        <router-link to="/">Home</router-link>
        <router-link to="/products">Products</router-link>
        <router-link to="/about">About</router-link>
    </div>
    
</template>