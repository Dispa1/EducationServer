'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Messages', 'userName', {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Messages', 'userName');
    }
};
//# sourceMappingURL=20240302125358-username-to-message.js.map