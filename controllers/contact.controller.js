exports.contactForm = (req, res, next) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    next({ status: 400, msg: 'Bad Request' });
  } else {
    const { name } = req.body;
    //res.send({ msg: `Thanks for contacting me, ${name}` })
    res.render('contact', { name });
  }
};
