/*
Language: Pyret
Description: An educational programming language
Category: scripting
Author: @BNAndras
Maintainer: @BNAndras
Website: https://pyret.org
*/

import { type HLJSApi, type Language } from "highlight.js";

export default function (hljs: HLJSApi): Language {
  const IDENT_RE = "[a-zA-Z_][a-zA-Z0-9$_\\-]*";

  const KEYWORDS = [
    "fun", "lam", "method", "spy", "var", "when", "include", "import", "provide",
    "module", "type", "newtype", "check", "examples", "data", "end", "except", "for",
    "from", "cases", "shadow", "let", "letrec", "rec", "ref",
    "and", "or", "not", "is", "raises", "satisfies", "violates", "mutable", "cyclic", "lazy",
    "as", "if", "else", "deriving", "select", "extend", "transform", "extract", "sieve",
    "order", "of", "ascending", "descending", "sanitize", "using", "because",
    "provide-types", "type-let", "is-not", "is-roughly", "is-not-roughly", "raises-other-than",
    "does-not-raise", "raises-satisfies", "raises-violates",
    "try", "with", "then", "sharing", "where", "case", "graph", "block", "ask", "otherwise",
    "table", "load-table", "reactor", "row", "source", "on-tick", "on-mouse", "on-key",
    "to-draw", "stop-when", "title", "close-when-stop", "seconds-per-tick", "init",
    "use", "context"
  ];

  const LITERAL_KEYWORDS = [
    "true", "false", "empty"
  ];

  const BUILTINS = [
    "is==", "is=~", "is<=>", "is-not==", "is-not=~", "is-not<=>"
  ];

  const COMMENT = hljs.COMMENT("#", "$");
  const BLOCK_COMMENT = hljs.COMMENT("#\\|", "\\|#", {
    contains: ["self"]
  });

  const STRINGS = {
    variants: [
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      {
        className: "string",
        begin: "```",
        end: "```"
      }
    ]
  };

  const NUMBERS = {
    className: "number",
    variants: [
      { match: /(?<![a-zA-Z0-9$_\-])~?[+-]?[0-9]+\.[0-9]+([eE][-+]?[0-9]+)?(?![a-zA-Z0-9$_\-])/ }, // Decimals and scientific
      { match: /(?<![a-zA-Z0-9$_\-])~?[+-]?[0-9]+\/[0-9]+(?![a-zA-Z0-9$_\-])/ },                   // Fractions (e.g. 1/2)
      { match: /(?<![a-zA-Z0-9$_\-])~?[+-]?[0-9]+([eE][-+]?[0-9]+)?(?![a-zA-Z0-9$_\-])/ }          // Integers
    ],
    relevance: 0
  };

  const TYPE_ANNOTATION = {
    className: "type",
    begin: /::\s*/,
    end: /(?=[,)\n])/,
    excludeBegin: true,
    relevance: 0
  };

  const TYPE_RETURN = {
    className: "type",
    begin: /->\s*/,
    end: /(?=:)/,
    excludeBegin: true,
    relevance: 0
  };

  const TYPE_PARAM = {
    className: "type",
    begin: /</,
    end: />/,
    excludeBegin: false,
    excludeEnd: false,
    relevance: 0
  };
  
  const BUILTIN_LISTS = {
    className: "built_in",
    match: /(?<=\[)(list|set|string-dict|mutable-string-dict)(?=:)/
  };

  return {
    name: "Pyret",
    aliases: ["arr"],
    keywords: {
      $pattern: IDENT_RE,
      keyword: KEYWORDS,
      literal: LITERAL_KEYWORDS,
      built_in: BUILTINS
    },
    contains: [
      BLOCK_COMMENT,
      COMMENT,
      STRINGS,
      NUMBERS,
      BUILTIN_LISTS,
      {
        className: "keyword",
        match: /(?:is|is-not|raises|satisfies|violates|raises-satisfies|raises-violates|raises-other-than|does-not-raise)%(?=\()/
      },
      {
        className: "function",
        beginKeywords: "fun method lam", end: /:/,
        excludeEnd: true,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            begin: IDENT_RE
          }),
          TYPE_PARAM,
          {
            className: "params",
            begin: /\(/, end: /\)/,
            contains: [
              COMMENT,
              BLOCK_COMMENT,
              TYPE_ANNOTATION
            ]
          },
          TYPE_RETURN
        ]
      },
      {
        className: "class",
        beginKeywords: "data", end: /:/,
        excludeEnd: true,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            begin: IDENT_RE
          }),
          TYPE_PARAM
        ]
      },
      {
        className: "operator",
        match: /=>|->|::|:=|==|<>|>=|<=|[+*\/<>=!%]|(?<=\s)-(?=\s)/
      }
    ]
  };
}
