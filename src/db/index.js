const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db/data.db',
  },
  useNullAsDefault: true,
});

async function createdb() {
  try {
    //drops if present
    await knex.schema
      //.dropTableIfExists('users')

      .createTable('users', t => {
        t.increments('id').primary()
        t.text('email').unique().notNullable;
        t.text('password').notNullable();
        t.text('role').checkIn(['ADMIN', 'MEMBER','TECHNICIAN']).notNullable();
        t.text('designation').defaultTo('');
        t.text('company').defaultTo('');
        t.text('firstname').notNullable().defaultTo('');
        t.text('lastname').notNullable().defaultTo('');
      })
    await knex('users').insert({email: 'dummyemail', password: 'dummyhash', role: 'MEMBER', firstname:'', lastname:''})
    
    } catch (e) {
      console.log(e)
  }
}

module.exports = {createdb, knex}