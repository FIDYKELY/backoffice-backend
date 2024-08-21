class PageViewsController {
    constructor(repository) {
        this.repository = repository;
    }

    incrementView = async (req, res) => {
        try {
            const page_name = req.body.page_name;

            if (page_name) {
                await this.repository.incrementView({
                    section: page_name,
                });
                const response = "Page viewed";
                return res.status(201).json({ data: response });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

    GetMostViewed = async (req, res) => {
        try {
            const response = await this.repository.GetMostViewed();
            return res.status(201).json({ data: response });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };
}

module.exports = PageViewsController;
