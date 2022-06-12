import { DataTypes, QueryInterface } from 'sequelize/types';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('post_users', {
      post_id: {
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
    // .then(() => queryInterface.addConstraint('post_users', {
    //   type: 'FOREIGN KEY',
    //   fields: ['user_id'],
    //   name: 'FK_user_post_likes', // useful if using queryInterface.removeConstraint
    //   references: {
    //     table: 'users',
    //     field: 'id',
    //   },
    //   onDelete: 'no action',
    //   onUpdate: 'no action',
    // }))
    // .then(() => queryInterface.addConstraint('post_users', {
    //   type: 'FOREIGN KEY',
    //   fields: ['post_id'],
    //   name: 'FK_post_post_likes', // useful if using queryInterface.removeConstraint
    //   references: {
    //     table: 'posts',
    //     field: 'id',
    //   },
    //   onDelete: 'no action',
    //   onUpdate: 'no action',
    // }));
  },
  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.dropTable('post_users');
  },
};
