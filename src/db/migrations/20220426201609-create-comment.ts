import { DataTypes, QueryInterface } from 'sequelize/types';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface
      .createTable('comments', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        post_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        content: {
          allowNull: false,
          type: Sequelize.TEXT,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() =>
        queryInterface.addConstraint('comments', {
          type: 'foreign key',
          fields: ['user_id'],
          // TODO: change back
          name: 'FK_user_comments', // useful if using queryInterface.removeConstraint
          references: {
            table: 'users',
            field: 'id',
          },
          onDelete: 'no action',
          onUpdate: 'no action',
        })
      )
      .then(() =>
        queryInterface.addConstraint('comments', {
          type: 'foreign key',
          fields: ['post_id'],
          // TODO: change back
          name: 'FK_post_comments', // useful if using queryInterface.removeConstraint
          references: {
            table: 'posts',
            field: 'id',
          },
          onDelete: 'no action',
          onUpdate: 'no action',
        })
      );
  },
  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.dropTable('comments');
  },
};
