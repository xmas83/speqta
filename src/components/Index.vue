<template>
	<div class="page-wrapper">
		<header-default></header-default>
		<main class="main skeleton-body">
			<div class="page-content pb-10 mb-3">
				<div class="container">
					<div class="row main-content-wrap gutter-lg">
						<sidebar-filter
							class="mt-lg-2"
						></sidebar-filter>

						<div class="col-lg-9 main-content">
							<card-list></card-list>
						</div>
					</div>
				</div>
			</div>
		</main>
		<footer-default></footer-default>
		<scroll-top-button></scroll-top-button>
	</div>
</template>

<script>
import HeaderDefault from './common/HeaderDefault';
import FooterDefault from './common/FooterDefault';
import ScrollTopButton from './common/ScrollTopButton';
import CardList from './partials/CardList.vue';
import SidebarFilter from './partials/SidebarFilter.vue';

export default {
	components: {
		SidebarFilter,
		CardList,
		HeaderDefault,
		FooterDefault,
		ScrollTopButton
	}
};
</script>