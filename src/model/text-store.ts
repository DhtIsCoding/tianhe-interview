export interface TextSimpleDisplay {
  date: string;
  question: string;
}

export interface TextStore extends TextSimpleDisplay {
  answer: string;
}
