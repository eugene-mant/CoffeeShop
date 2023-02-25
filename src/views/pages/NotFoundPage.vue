<styles lang="scss">
    .notfound-page {
        .u-btn {
            margin: 2rem auto;
            cursor: pointer;
        }
    }
</styles>

<template>
	<div class="notfound-page page">
		<div class="page-title">404</div>
		<div class="u-btn" @click="$router.go(-1)">Back</div>
	</div>
</template>

<script></script>