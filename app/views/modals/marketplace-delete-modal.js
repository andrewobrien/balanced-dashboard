import ModalBaseView from "./modal-base";
import DeleteMixin from "balanced-dashboard/views/modals/mixins/object-action-mixin";
import Utils from "balanced-dashboard/lib/utils";

var MarketplaceDeleteModalView = ModalBaseView.extend(DeleteMixin, {
	templateName: 'modals/marketplace-delete-modal',
	title: "Remove marketplace?",
	elementId: "delete-marketplace",

	getUserMarketplace: function() {
		var marketplacesUri = this.get("user.marketplaces_uri");
		var marketplaceId = this.get("marketplace.id");
		var uri = Utils.combineUri(marketplacesUri, marketplaceId);
		var marketplace = this.get("container").lookup("model:user-marketplace");
		marketplace.setProperties({
			uri: uri,
			isLoaded: true
		});
		return marketplace;
	},

	actions: {
		save: function() {
			var user = this.get("user");
			var model = this.getUserMarketplace();
			this.delete(model)
				.then(function() {
					return user.reload();
				});
		}
	}
});

MarketplaceDeleteModalView.reopenClass({
	open: function(user, marketplace) {
		return this.create({
			marketplace: marketplace,
			user: user,
		});
	}
});

export default MarketplaceDeleteModalView;
