const router = require('express').Router();
const Kitap = require('../models/bookModel');


/**
 * @swagger
 * tags:
 *  name: Books
 *  description: The book managing API
 */

/**
 * @swagger
 * /book:
 *      get:
 *          summary: Returns the list of all the books
 *          tags: [Books]
 *          responses:
 *              200:
 *                  description: Kitaplarin listesini dondurur.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Book'
 */
router.get('/', async(req, res) => {
    const kitapList = await Kitap.find({});

    //console.log(typeof kitapList);
    res.json({
        kitapList
    });
});


/**
 * @swagger
 * /book/{id}:
 *  get:
 *      summary: Returns the book by the id
 *      tags: [Books]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The book id
 *      responses:
 *          200:
 *            description: The book description by id
 *            content:
 *              application/json:
 *                  shema:
 *                     $ref: '#/components/schemas/Book'
 *          400:
 *            description: The book not found
 */

router.get('/:id', async(req, res) => {
    const getKitapById = await Kitap.findById({ _id: req.params.id }, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 });
    try {
        return res
            .status(200)
            .send(getKitapById)
    } catch (err) {
        return res
            .status(404)
            .send(`Kitap getirilirken bir hata meydana geldi. ${err}`);
    }
});


/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 */

router.post('/', async(req, res) => {
    try {
        const kitap = new Kitap(req.body);
        const result = await kitap.save();
        res
            .status(200)
            .send(result);
    } catch (err) {
        res
            .status(500)
            .send(`Kitap kaydederken bir hata meydana geldi.: ${err}`);
    }
});




router.patch('/:id', async(req, res) => {
    try {
        const result = await Kitap.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
        if (result) {
            return res
                .status(200)
                .send(result);
        } else {
            return res
                .status(404)
                .json({
                    "message": "Kitap bulunamadi"
                });
        }
    } catch (err) {
        res.send(`Kitap kaydederken bir hata meydana geldi.: ${err}`);
    }
});




/**
 * @swagger
 * /book/{id}:
 *  delete:
 *      summary: Verilen id ye gore kitap siler
 *      tags: [Books]
 *      parameters:
 *          -in: path
 *          name: id
 *          schema:
 *              type: String
 *          require: true
 *          description: Kitabin id si
 * 
 *      responses:
 *          200:
 *             description: Kitap Silindi
 *             content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Book'
 *          404:
 *              description: Kitap bulunamadi
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Book'
 *          
 *             
 * 
 */

router.delete('/:id', async(req, res) => {
    try {
        const result = await Kitap.findByIdAndDelete({ _id: req.params.id });
        if (result) {
            return res
                .status(200)
                .json({
                    "mesaj": "Kitap Silindi"
                })
        } else {
            return res
                .status(404)
                .json({
                    "message": "Kitap bulunamadi"
                })
        }
    } catch (err) {
        return res.send(`Kitap silinirken bir hata olustu.: ${err}`);
    }

});




router.get('/filter-page-number/:pN', async(req, res) => {
    let pageNumber = req.params.pN;
    const filterKitapList = await Kitap
        .find({ sayfaSayisi: { $gte: pageNumber } }, { _id: 0 });

    if (filterKitapList.length > 0) {
        return res
            .status(200)
            .json(filterKitapList)
    } else {
        return res
            .status(300)
            .json({
                message: 'Filtreye uygun kitap bulunamadi'
            })
    }

});




module.exports = router;