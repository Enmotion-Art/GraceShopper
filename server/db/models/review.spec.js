/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('Review model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  /**
   * Next, we create an (un-saved!) art instance before every spec
   */
  const content = 'The South African cliff swallow (Petrochelidon spilodera), also known as the South African swallow, is a species of bird in the Hirundinidae family.';

  let art;
  beforeEach(() => {
    art = Art.build({
      content: fullText,
      stars: 2
    });
  });

  /**
   * Also, we empty the tables after each spec
   */
  afterEach(() => {
    return Promise.all([
      Art.truncate({ cascade: true }),
    ]);
  });

  describe('attributes definition', () => {

    /**
     * Your model should have one field required: content`.
     */
    it('includes `content` and `stars` fields', async () => {

      const savedArt = await art.save();
      expect(savedArt.content).to.equal(fullText);

    });

    });




}) // end describe('Review model')


// //------------
// describe('The `Article` model', () => {

//   /**
//    * First we clear the database and recreate the tables before beginning a run
//    */
//   before(() => {
//     return db.sync({force: true});
//   });

//   /**
//    * Next, we create an (un-saved!) article instance before every spec
//    */
//   const fullText = 'The South African cliff swallow (Petrochelidon spilodera), also known as the South African swallow, is a species of bird in the Hirundinidae family.';

//   let article;
//   beforeEach(() => {
//     article = Article.build({
//       title: 'Migratory Birds',
//       content: fullText
//     });
//   });

//   /**
//    * Also, we empty the tables after each spec
//    */
//   afterEach(() => {
//     return Promise.all([
//       Article.truncate({ cascade: true }),
//       User.truncate({ cascade: true })
//     ]);
//   });

//   describe('attributes definition', () => {

//     /**
//      * Your model should have two fields (both required): `title` and `content`.
//      *
//      * http://docs.sequelizejs.com/manual/tutorial/models-definition.html
//      */
//     it('includes `title` and `content` fields', async () => {

//       const savedArticle = await article.save();
//       expect(savedArticle.title).to.equal('Migratory Birds');
//       expect(savedArticle.content).to.equal(fullText);

//     });

//     it('requires `content`', async () => {

//       article.content = null;

//       let result, error;
//       try {
//         result = await article.validate();
//       } catch (err) {
//         error = err;
//       }

//       if (result) throw Error('validation should fail when content is null');

//       expect(error).to.be.an.instanceOf(Error);

//     });
