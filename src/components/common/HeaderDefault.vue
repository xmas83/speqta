<template>
	<header class="header header-border">
		<sticky-wrapper>
			<div class="header-middle sticky-header fix-top sticky-content">
				<div class="container">
					<div class="header-left">
						<a
							href="#"
						>
							<h4 class="mb-0" style="color: lightsteelblue">SPEQTA</h4>
						</a>
					</div>
					<div class="header-right">
						<search-box></search-box>
					</div>
				</div>
			</div>
		</sticky-wrapper>
	</header>
</template>

<script>
import StickyWrapper from '../elements/StickyWrapper';
import SearchBox from '../common/SearchBox';

export default {
	components: {
		StickyWrapper,
		SearchBox
	}
};
</script>
