export interface TextSimpleDisplay {
  date: string;
  question: string;
}

export interface TextStoreModel extends TextSimpleDisplay {
  answer: {
    date: string;
    content: string;
  }[];
}
