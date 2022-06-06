const Card = require('../models/card');

const InvalidRequest = require('../errors/InvalidRequest');
const ProhibitedAction = require('../errors/ProhibitedAction');
const NotFound = require('../errors/NotFound');

const findAllCards = (_, res, next) => {
  Card.find({})
    .populate('owner')
    .then((card) => res.send({ data: card }))
    .catch((err) => next(err));
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка с указанным _id не найден.');
      } else if (!card.owner.equals(req.user._id)) {
        throw new ProhibitedAction('Попытка удалить чужую карточку.');
      } else {
        return card.remove().then(() => res.status(200).send({ data: card }));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidRequest('Невалидный id.'));
        return;
      }
      next(err);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidRequest('Переданы некорректные данные при создании карточки.'));
        return;
      }
      next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFound('Передан несуществующий _id карточки.'));
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidRequest('Невалидный id.'));
        return;
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFound('Передан несуществующий _id карточки.'));
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidRequest('Невалидный id.'));
        return;
      }
      next(err);
    });
};

module.exports = {
  findAllCards, deleteCard, createCard, likeCard, dislikeCard,
};
