const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      full_name: 'Test user 1',
      nickname: 'TU1',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      user_name: 'test-user-2',
      full_name: 'Test user 2',
      nickname: 'TU2',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      user_name: 'test-user-3',
      full_name: 'Test user 3',
      nickname: 'TU3',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      user_name: 'test-user-4',
      full_name: 'Test user 4',
      nickname: 'TU4',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ]
}
function makeListArray(){
  return [
    {
      id: 1,
      list_name: 'Favortite List'
    },
    {
      id: 2,
      list_name: 'Wish List'
    },
    {
      id: 3,
      list_name: 'Already Tried'
    }
  ]
}
function makeWhiskeyArray(users) {
  return [
    {
      id: 1,
      whiskey_name: 'First test thing!',
      image: 'http://placehold.it/500x500',
      origin: 'Ireland',
      abv: 40,
      price: 54.99,
      content: 'test description',
      nose: 'smell description',
      palate: 'taste',
      finish: 'drink',
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 2,
      whiskey_name: 'First test thing!',
      image: 'http://placehold.it/500x500',
      origin: 'Ireland',
      abv: 40,
      price: 54.99,
      content: 'test description',
      nose: 'smell description',
      palate: 'taste',
      finish: 'drink',
      user_id: users[1].id,
      date_created: '2029-01-22T16:28:32.615Z',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 3,
      whiskey_name: 'First test thing!',
      image: 'http://placehold.it/500x500',
      origin: 'Ireland',
      abv: 40,
      price: 54.99,
      content: 'test description',
      nose: 'smell description',
      palate: 'taste',
      finish: 'drink',
      user_id: users[2].id,
      date_created: '2029-01-22T16:28:32.615Z',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 4,
      whiskey_name: 'First test thing!',
      image: 'http://placehold.it/500x500',
      origin: 'Ireland',
      abv: 40,
      price: 54.99,
      content: 'test description',
      nose: 'smell description',
      palate: 'taste',
      finish: 'drink',
      user_id: users[3].id,
      date_created: '2029-01-22T16:28:32.615Z',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    }
  ]
}
function makeUserListArray(users, whiskey, list){
  return [
    {
      id: 1,
      whiskey_id: whiskey[0].id,
      user_id: users[0].id,
      list_id: list[1].id
    },
    {
      id: 2,
      whiskey_id: whiskey[1].id,
      user_id: users[1].id,
      list_id: list[2].id
    },
    {
      id: 3,
      whiskey_id: whiskey[2].id,
      user_id: users[1].id,
      list_id: list[2].id
    }
  ]
}

function makeReviewsArray(users, whiskey) {
  return [
    {
      id: 1,
      rating: 2,
      tasting: 'First test review!',
      whiskey_id: whiskey[0].id,
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      rating: 3,
      tasting: 'Second test review!',
      whiskey_id: whiskey[0].id,
      user_id: users[1].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      rating: 1,
      tasting: 'Third test review!',
      whiskey_id: whiskey[0].id,
      user_id: users[2].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      rating: 5,
      tasting: 'Fourth test review!',
      whiskey_id: whiskey[0].id,
      user_id: users[3].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 5,
      rating: 1,
      tasting: 'Fifth test review!',
      whiskey_id: whiskey[whiskey.length - 1].id,
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 6,
      rating: 2,
      tasting: 'Sixth test review!',
      whiskey_id: whiskey[whiskey.length - 1].id,
      user_id: users[2].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 7,
      rating: 5,
      tasting: 'Seventh test review!',
      whiskey_id: whiskey[3].id,
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ];
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
     const token = jwt.sign({ user_id: user.id }, secret, {
       subject: user.user_name,
       algorithm: 'HS256',
     })
     return `Bearer ${token}`
   }

function makeExpectedWhiskey(users, whiskey, reviews=[]) {
  const user = users
    .find(user => user.id === whiskey.user_id)

  const whiskeyReviews = reviews
    .filter(review => review.whiskey_id === whiskey.id)

  const number_of_reviews = whiskeyReviews.length
  const average_review_rating = calculateAverageReviewRating(whiskeyReviews)

  return {
    id: whiskey.id,
    image: whiskey.image,
    whiskey_name: whiskey.whiskey_name,
    content: whiskey.content,
    nose: whiskey.nose,
    palate: whiskey.palate,
    finish: whiskey.finish,
    date_created: whiskey.date_created,
    number_of_reviews,
    average_review_rating,
    user: {
      id: user.id,
      user_name: user.user_name,
      full_name: user.full_name,
      nickname: user.nickname,
      date_created: user.date_created,
    },
  }
}

function calculateAverageReviewRating(reviews) {
  if(!reviews.length) return 0

  const sum = reviews
    .map(review => review.rating)
    .reduce((a, b) => a + b)

  return Math.round(sum / reviews.length)
}

function makeExpectedWhiskeyReviews(users, whiskeyId, reviews) {
  const expectedReviews = reviews
    .filter(review => review.whiskey_id === whiskeyId)

  return expectedReviews.map(review => {
    const reviewUser = users.find(user => user.id === review.user_id)
    return {
      id: review.id,
      tasting: review.tasting,
      rating: review.rating,
      date_created: review.date_created,
      user: {
        id: reviewUser.id,
        user_name: reviewUser.user_name,
        full_name: reviewUser.full_name,
        nickname: reviewUser.nickname,
        date_created: reviewUser.date_created,
      }
    }
  })
}

function makeMaliciousWhiskey(user) {
  const maliciousWhiskey = {
    id: 911,
    image: 'http://placehold.it/500x500',
    date_created: new Date().toISOString(),
    whiskey_name: 'Naughty naughty very naughty <script>alert("xss");</script>',
    user_id: user.id,
    content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
  }
  const expectedWhiskey = {
    ...makeExpectedWhiskey([user], maliciousWhiskey),
    whiskey_name: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  }
  return {
    maliciousWhiskey,
    expectedWhiskey
  }
}

function makeWhiskeyFixtures() {
  const testUsers = makeUsersArray()
  const testList = makeListArray()
  const testWhiskey = makeWhiskeyArray(testUsers)
  const testUserList = makeUserListArray(testUsers, testWhiskey, testList)
  const testReviews = makeReviewsArray(testUsers, testWhiskey)
  return { testUsers, testList, testWhiskey, testUserList, testReviews }
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      whiskey_reviews,
      user_list,
      whiskey,
      whiskey_list,
      whiskey_users
      RESTART IDENTITY CASCADE`
  )
}

function seedUsers(db, users) {
     const preppedUsers = users.map(user => ({
       ...user,
       password: bcrypt.hashSync(user.password, 1)
     }))
     return db
       .into('whiskey_users')
       .insert(preppedUsers)
   }

function seedWhiskeyTables(db, users, whiskey, reviews=[]) {
 return seedUsers(db, users)
    .then(() =>
      db
        .into('whiskey')
        .insert(whiskey)
    )
    .then(() =>
      reviews.length && db.into('whiskey_reviews').insert(reviews)
    )
}

function seedMaliciousWhiskey(db, user, whiskey) {
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('whiskey')
        .insert([whiskey])
    )
}

module.exports = {
  makeUsersArray,
  makeWhiskeyArray,
  makeExpectedWhiskey,
  makeExpectedWhiskeyReviews,
  makeMaliciousWhiskey,
  makeReviewsArray,

  makeWhiskeyFixtures,
  cleanTables,
  seedWhiskeyTables,
  seedMaliciousWhiskey,
  makeAuthHeader,
  seedUsers
}
