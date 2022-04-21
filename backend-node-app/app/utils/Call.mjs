const Call = (method) => (req, res, next) => method(req, res).catch((e) => next(e));

export default Call;
