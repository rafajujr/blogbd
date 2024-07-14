export type UserTypes = {
  name: string;
  email: string;
  senha: string;
};

export type AutorType = {
  name: string;
};

export type CategoriaTypes = {
  name: string;
};

export type PostTypes = {
  title: string;
  content: string;
  imag: string;
  autorId: number;
  categoriaId: number;
};
