module.exports = {
	async up(db) {
		db.createCollection('users');
		// TODO write your migration here.
		// See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
		// Example:
		// await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
	},

	// async down(db, client) {
	async down(db) {
		db.collection('users').drop();
		// TODO write the statements to rollback your migration (if possible)
		// Example:
		// await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
	},
};