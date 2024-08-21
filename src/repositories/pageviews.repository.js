const { Pageviews } = require("../models/pageviews.model");
const { DatabaseError } = require("../utils/error.util");
const sequelize = require("../config/database");

class PageViewsRepository {
    /**
     * Incrementer count_view de pageview pour une page
     *
     * @param {object} dataObject
     * @returns object
     */

    async incrementView(dataObject) {
        const page_name = dataObject.section;

        try {
            const [pageView, created] = await Pageviews.findOrCreate({
                where: { page_name: page_name },
                defaults: { page_name: page_name }
            });

            if (!created) {
                await pageView.increment('count_view');
            }
        } catch (error) {
            console.error("Erreur lors de l'incrementatation de la page :", error);
            throw new DatabaseError("Erreur lors de l'incrementatation de la page");
        }
    }

    async GetMostViewed() {
        try {
            const maxCountView = await Pageviews.max('count_view');
            const response = await Pageviews.findOne({
                where: {
                    count_view: maxCountView
                }
            });
    
            if (response) {
                return response;
            } else {
                throw new Error("No page found with the maximum view count.");
            }
        } catch (error) {
            console.error("Erreur quand on prend le plus visite :", error);
            throw new DatabaseError("Erreur quand on prend le plus visite");
        }
    }
        
}

module.exports = PageViewsRepository;
