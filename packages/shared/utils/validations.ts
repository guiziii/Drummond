type Strength = {
  id: number;
  value?: string;
  length?: number;
  contains?: Array<any>;
};

const REGEX_PATTERN = {
  CPF: /^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}|\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/,
  EMAIL:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/,
};

const CPF = {
  verifierDigit(digits: string) {
    const numbers = digits.split("").map(number => {
      return parseInt(number, 10);
    });
    const modulus = numbers.length + 1;
    const multiplied = numbers.map(
      (number, index) => number * (modulus - index)
    );
    const mod = multiplied.reduce((buffer, number) => buffer + number) % 11;
    return mod < 2 ? 0 : 11 - mod;
  },
  strip(number: string, strict = false) {
    const regex = strict ? /[.-]/g : /[^\d]/g;
    return (number.toString() || "")?.replace(regex, "");
  },
  isValid(number: string, strict: boolean = false) {
    const pattern = REGEX_PATTERN.CPF;
    const BLACKLIST = [
      "00000000000",
      "11111111111",
      "22222222222",
      "33333333333",
      "44444444444",
      "55555555555",
      "66666666666",
      "77777777777",
      "88888888888",
      "99999999999",
      "12345678909",
    ];

    if (!pattern.test(number)) {
      return false;
    }

    const stripped = CPF.strip(number, strict);

    if (!stripped) {
      return false;
    }

    if (stripped.length !== 11) {
      return false;
    }

    if (BLACKLIST.includes(stripped)) {
      return false;
    }

    let numbers = stripped.substr(0, 9);
    numbers += CPF.verifierDigit(numbers);
    numbers += CPF.verifierDigit(numbers);
    return numbers.substr(-2) === stripped.substr(-2);
  },
  insertMask(cpf: string) {
    cpf = cpf.replace(/[^\d]/g, "");
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  },
};

const EMAIL = {
  isValid(str: string) {
    const pattern = REGEX_PATTERN.EMAIL;

    return pattern.test(str);
  },
};

const PHONE = {
  insertMask(v: string) {
    v = v.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");
    return v;
  },
};

const PASSWORD = {
  getPasswordStrength(password: string) {
    const lowerCaseRegex = "(?=.*[a-z])";
    const upperCaseRegex = "(?=.*[A-Z])";
    const symbolsRegex = "(?=.*[!@#$%^&*])";
    const numericRegex = "(?=.*[0-9])";

    let strength: Strength = {
      id: 0,
      value: undefined,
      length: undefined,
      contains: [],
    };

    let passwordContains: any = [];

    if (new RegExp(`^${lowerCaseRegex}`).test(password)) {
      passwordContains = [
        ...passwordContains,
        {
          message: "lowercase",
        },
      ];
    }

    if (new RegExp(`^${upperCaseRegex}`).test(password)) {
      passwordContains = [
        ...passwordContains,
        {
          message: "uppercase",
        },
      ];
    }

    if (new RegExp(`^${symbolsRegex}`).test(password)) {
      passwordContains = [
        ...passwordContains,
        {
          message: "symbol",
        },
      ];
    }

    if (new RegExp(`^${numericRegex}`).test(password)) {
      passwordContains = [
        ...passwordContains,
        {
          message: "number",
        },
      ];
    }

    const strongRegex = new RegExp(
      `^${lowerCaseRegex}${upperCaseRegex}${numericRegex}${symbolsRegex}(?=.{8,})`
    );
    const mediumRegex = new RegExp(
      `^${lowerCaseRegex}${upperCaseRegex}${numericRegex}(?=.{6,})`
    );

    if (strongRegex.test(password)) {
      strength = {
        id: 2,
        value: "Strong",
      };
    } else if (mediumRegex.test(password)) {
      strength = {
        id: 1,
        value: "Medium",
      };
    } else {
      strength = {
        id: 0,
        value: "Weak",
      };
    }

    strength.length = password.length;
    strength.contains = passwordContains;
    return strength;
  },
  isValid(str: string) {
    const pattern = REGEX_PATTERN.PASSWORD;

    if (pattern.test(str)) return true;
    else return false;
  },
};

const MONEY = {
  insertMask(v: number, locale = "pt-BR", currency = "BRL") {
    let formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    });

    return formatter.format(v);
  },
};

const Validations = {
  CPF,
  EMAIL,
  PASSWORD,
  PHONE,
  MONEY,
};

export default Validations;
