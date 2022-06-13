import { DataTypes, QueryInterface } from 'sequelize/types';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('comment_users', {
      comment_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    // .then(() => queryInterface.addConstraint('comment_likes', {
    //   type: 'FOREIGN KEY',
    //   fields: ['user_id'],
    //   name: 'FK_user_comment_likes', // useful if using queryInterface.removeConstraint
    //   references: {
    //     table: 'users',
    //     field: 'id',
    //   },
    //   onDelete: 'no action',
    //   onUpdate: 'no action',
    // }))
    // .then(() => queryInterface.addConstraint('comment_likes', {
    //   type: 'FOREIGN KEY',
    //   fields: ['comment_id'],
    //   name: 'FK_comment_comment_likes', // useful if using queryInterface.removeConstraint
    //   references: {
    //     table: 'comments',
    //     field: 'id',
    //   },
    //   onDelete: 'no action',
    //   onUpdate: 'no action',
    // }));
  },
  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.dropTable('comment_users');
  },
};
