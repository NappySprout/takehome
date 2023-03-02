const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './data.db',
  },
  useNullAsDefault: true,
});

async function createdb() {
  try {
    //drops if present
    await knex.schema
      .dropTableIfExists('users')

      .createTable('users', t => {
        t.increments('id').primary()
        t.text('email').unique().notNullable;
        t.text('password').notNullable();
        t.text('role').checkIn(['ADMIN', 'MEMBER','TECHNICIAN']).notNullable();
        t.text('designation');
        t.text('company');
        t.text('firstname').notNullable();
        t.text('lastname').notNullable();
      })
    await knex('users').insert({email: 'dummyemail', password: 'dummyhash', role: 'MEMBER', firstname:'', lastname:''})
    
    } catch (e) {
      console.log(e)
  }
}

module.exports = {createdb, knex}