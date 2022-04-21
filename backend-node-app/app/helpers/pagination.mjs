const pagination = (query, { page, pageSize }) => {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;
  return {
    ...query,
    offset,
    limit,
  };
};
export default pagination;
