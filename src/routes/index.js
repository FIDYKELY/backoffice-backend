const express = require("express")();
const accountAdminRoutes = require('./manage/accountAdmin.routes');
const activityRoutes = require('./manage/activity.routes');
const signalementRoutes = require('./manage/signalement.routes');
const accountUserRoutes = require('./accountUser.routes');
const careerRoutes = require('./career.routes');
// const commentRoutes = require('./comment.routes');
const contactRoutes = require('./contact.routes');
const favorisRoutes = require('./favoris.routes');
const feedbackRoutes = require('./feedback.routes');
// const friendRoutes = require('./friend.routes');
const messageRoutes = require('./message.routes');
// const notificationRoutes = require('./notification.routes');
// const pictureRoutes = require('./picture.routes');
// const pollRoutes = require('./poll.routes');
// const postRoutes = require('./post.routes');
const preferenceRoutes = require('./preference.routes');
// const publicationRoutes = require('./publication.routes');
// const rateRoutes = require('./rate.routes');
const reportRoutes = require('./report.routes');
// const surveyRoutes = require('./survey.routes');
const userRoutes = require('./user.routes');
const annuaireRoutes = require('./annuaire.routes');
// const pageviewsRoutes = require('./pageviews.routes'); // -- increment
const roleRoutes = require('./role'); // Ajout des routes de gestion des rôles
const permissionRoutes = require('./permission'); // Ajout des routes de gestion des permissions

express.use(roleRoutes);
express.use(permissionRoutes);
express.use(accountAdminRoutes);
express.use(activityRoutes);
express.use(signalementRoutes);
express.use(accountUserRoutes);
express.use(careerRoutes);
// express.use(commentRoutes);
express.use(contactRoutes);
express.use(favorisRoutes);
express.use(feedbackRoutes);
// express.use(friendRoutes);
express.use(messageRoutes);
// express.use(notificationRoutes);
express.use(preferenceRoutes);
// express.use(rateRoutes);
express.use(reportRoutes);
express.use(userRoutes);
express.use(annuaireRoutes);
// express.use(pageviewsRoutes);

module.exports = express;
