const bcrypt = require('bcryptjs');

const db = require('../data/database');

class User {
    constructor(email, password, fullname, street, postal, city) { // if you have only one value the rest(parameters) will automatically be set to undefined
        this.email = email;
        this.password = password;
        this.name = fullname;
        this.address = {
            street: street,
            postalCode: postal,
            city: city
        };
    }

    getUserWithSameEmail() {
        return db.getDb().collection('users').findOne({ email: this.email }) // findOne method return a promise so we dont need async-await 
    }

    async signup() {
        const hashedPassword = await bcrypt.hash(this.password, 12);

        await db.getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword,
            name: this.name,
            address: this.address
        });
    }

    hasMatchingPassword(hashedPassword) {
        return bcrypt.compare(thies.password, hashedPassword)
    }
}

module.exports = User;