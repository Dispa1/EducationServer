'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Message', 'userName', {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Message', 'userName');
    }
};
export {};
//# sourceMappingURL=20240302125358-username-to-message.js.map