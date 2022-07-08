module.exports.findErrorsFormUser = formData => {
  const {
    id,
    intNumber,
    name,
    user_name,
    territory,
    warehouse,
    incomeAccount,
    discountOn,
    price,
    currency,
    changeAccount,
    expenseAccount,
    check_disable,
  } = formData

  const newErrors = {}

  const regexp = /^[0-9\b]+$/

  if (!intNumber || intNumber === "") newErrors.intNumber = "Number Is required"
  if (!regexp.test(intNumber))
    newErrors.intNumber = "Input Data Must Be Integer"
  if (intNumber < 10) newErrors.intNumber = "must greater than 10"
  if (!name || name === "") newErrors.name = "user name is required"
  if (!territory || territory === "")
    newErrors.territory = "user territory is required"
  if (!warehouse || warehouse === "")
    newErrors.warehouse = "user warehouse is required"
  if (!incomeAccount || incomeAccount === "")
    newErrors.incomeAccount = "user incomeAccount is required"
  if (!discountOn || discountOn === "")
    newErrors.discountOn = "user discountOn is required"
  if (!price || price === "") newErrors.price = "user price is required"
  if (!currency || currency === "")
    newErrors.currency = "user currency is required"
  if (!changeAccount || changeAccount === "")
    newErrors.changeAccount = "user changeAccount is required"
  if (!expenseAccount || expenseAccount === "")
    newErrors.expenseAccount = "user expenseAccount is required"
  if (!expenseAccount || expenseAccount === "")
    newErrors.expenseAccount = "user expenseAccount is required"
  if (!check_disable || check_disable === "")
    newErrors.check_disable = "user check_disable is required"

  return newErrors
}
