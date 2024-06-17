import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: 'v1.0.0',
    title: 'Foodies API',
    description: '  ',
  },
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description:
        'Enter your bearer token in the format **Bearer &lt;token>**',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Use it when you run in development mode',
    },
    {
      url: 'https://project-ssback01.onrender.com',
      description: 'Use it when you run in development mode',
    },
  ],
  tags: [],
  components: {
    schemas: {
      userRegisterReq: {
        $name: 'John Doe',
        $email: 'useremail@example.com',
        $password: 'userPassword',
      },
      userRegisterRes: {
        user: {
          name: 'John Doe',
          email: 'useremail@example.com',
          avatar: 'avatar url',
          token: 'userToken',
        },
      },
      userLoginReq: {
        $email: 'useremail@example.com',
        $password: 'userPassword',
      },
      userLoginRes: {
        token: 'userToken',
        user: {
          name: 'John Doe',
          email: 'useremail@example.com',
          avatar: 'avatar url',
        },
      },
      userResetPasswordReq: {
        $email: 'useremail@example.com',
      },
      userResetPasswordNewReq: {
        $password: 'userPassword',
      },
      userFollowingsRes: [
        {
          _id: '6462a6cd4c3d0ddd28897f8e',
          name: 'Ivan',
          avatar: 'avatar url',
          recipesCount: 20,
          recipes: [{ title: 'title', thumb: 'thumb' }],
        },
      ],
      userFollowersRes: [
        {
          _id: '6462a6cd4c3d0ddd28897f8e',
          name: 'Ivan',
          avatar: 'avatar url',
          recipesCount: 20,
          recipes: [{ title: 'title', thumb: 'thumb' }],
        },
      ],
      userCurrentRes: {
        _id: '6663f426eb7d2d69e77f78c7',
        name: 'Evgeniy',
        email: 'evesgghal@gmail.com',
        avatar: '//www.gravatar.com/avatar/eacc007f9c0d2d63e5677f75b3e0f360',
      },
      userByIdRes: {
        _id: '6663f426eb7d2d69e77f78c7',
        name: 'Evgeniy',
        email: 'evesgghal@gmail.com',
        avatar: '//www.gravatar.com/avatar/eacc007f9c0d2d63e5677f75b3e0f360',
        followersQty: 0,
        followingQty: 0,
        favRecipesQty: 0,
        recipesQty: 0,
      },
      userAvatarRes: {
        avatar: 'avatar url',
      },
      userRecipesFavoriteRes: {
        total: 343,
        quantity: 435,
        recipes: [
          {
            title: 'MyRecipe',
            instructions: 'recipe instructions',
            thumb: 'recipe thumb',
          },
        ],
      },
      categoriesRes: [
        {
          _id: '6462a6cd4c3d0ddd28897f8e',
          name: 'Beef',
        },
      ],
      areasRes: [
        {
          _id: '6462a6f04c3d0ddd28897f9f',
          name: 'Thai',
        },
      ],
      ingredientsRes: [
        {
          _id: '640c2dd963a319ea671e382c',
          name: 'Pears',
          desc: 'A sweet and juicy fruit with a soft, grainy texture and thin skin.',
          img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e382c.png',
        },
      ],
      testimonialsRes: [
        {
          _id: '647495d0c825f1570b04182d',
          owner: '64c8d958249fae54bae90bb9',
          testimonial:
            'Foodies has transformed my cooking experience! With its diverse recipe collection and user-friendly interface, I can easily find, save, and cook delicious meals for any occasion. From quick dinners to elaborate feasts, this app has become my go-to kitchen companion. Highly recommended!',
        },
      ],
      recipeRes: {
        _id: '6462a8f74c3d0ddd28897fbd',
        title: 'Bakewell tart',
        category: {
          _id: '6462a6cd4c3d0ddd28897f8f',
          name: 'Dessert',
        },
        owner: {
          _id: '64c8d958249fae54bae90bb9',
          name: 'GoIT',
          avatar: null,
        },
        area: {
          _id: '6462a6f04c3d0ddd28897fa1',
          name: 'British',
        },
        instructions:
          'To make the pastry, measure the flour into a bowl and rub in the butter with your fingertips until the mixture resembles fine breadcrumbs. Add the water, mixing to form a soft dough.\r\nRoll out the dough on a ligh.',
        description:
          'A British dessert consisting of a shortcrust pastry shell filled with raspberry jam, frangipane, and topped with almonds.',
        thumb:
          'https://ftp.goit.study/img/so-yummy/preview/Bakewell%20tart.jpg',
        time: '85',
        ingredients: [
          {
            id: {
              _id: '640c2dd963a319ea671e3743',
              name: 'Plain Flour',
              img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e3743.png',
            },
            measure: '175g/6oz',
          },
          {
            id: {
              _id: '640c2dd963a319ea671e369a',
              name: 'Chilled Butter',
              img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e369a.png',
            },
            measure: '75g/2½oz',
          },
        ],
        createdAt: '2023-03-11T19:25:33.239Z',
        updatedAt: '2023-11-04T11:53:47.388Z',
      },
      recipeReq: {
        title: 'Fassst cake',
        category: '6462a6cd4c3d0ddd28897f8f',
        owner: '6664addd6597c31134125d1e',
        area: '6462a6f04c3d0ddd28897f9f',
        instructions:
          'Heat oven to 180C/160C fan/gas 4 and line the base and sides of a 20cm square tin with baking parchment (the easiest way is to cross 2 x 20cm-long strips over the base).',
        description:
          'A classic cake made with almond sponge cake and covered with marzipan. It is traditionally pink and yellow checkered in appearance.',
        thumb:
          'https://ftp.goit.study/img/so-yummy/preview/Bakewell%20tart.jpg',
        ingredients: [
          {
            id: '640c2dd963a319ea671e367e',
            measure: '175g',
          },
          {
            id: '640c2dd963a319ea671e3687',
            measure: '175g',
          },
        ],
        time: '60',
      },
      recipesRes: {
        total: 286,
        recipes: [
          {
            _id: '6462a8f74c3d0ddd28897fbd',
            title: 'Bakewell tart',
            category: {
              _id: '6462a6cd4c3d0ddd28897f8f',
              name: 'Dessert',
            },
            owner: {
              _id: '64c8d958249fae54bae90bb9',
              name: 'GoIT',
              avatar: null,
            },
            area: {
              _id: '6462a6f04c3d0ddd28897fa1',
              name: 'British',
            },
            instructions:
              'To make the pastry, measure the flour into a bowl and rub in the butter with your fingertips until the mixture resembles fine breadcrumbs. Add the water, mixing to form a soft dough.',
            description:
              'A British dessert consisting of a shortcrust pastry shell filled with raspberry jam, frangipane, and topped with almonds.',
            thumb:
              'https://ftp.goit.study/img/so-yummy/preview/Bakewell%20tart.jpg',
            time: '85',
            ingredients: [
              {
                id: {
                  _id: '640c2dd963a319ea671e3743',
                  name: 'Plain Flour',
                  img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e3743.png',
                },
                measure: '175g/6oz',
              },
              {
                id: {
                  _id: '640c2dd963a319ea671e369a',
                  name: 'Chilled Butter',
                  img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e369a.png',
                },
                measure: '75g/2½oz',
              },

              {
                id: {
                  _id: '640c2dd963a319ea671e36d5',
                  name: 'Flaked Almonds',
                  img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e36d5.png',
                },
                measure: '50g/1¾oz',
              },
            ],
            createdAt: '2023-03-11T19:25:33.239Z',
            updatedAt: '2023-11-04T11:53:47.388Z',
          },
        ],
      },
      recipeRes: {
        title: 'Fassst cake',
        category: '6462a6cd4c3d0ddd28897f8f',
        owner: '6664addd6597c31134125d1e',
        area: '6462a6f04c3d0ddd28897f9f',
        instructions:
          'Heat oven to 180C/160C fan/gas 4 and line the base and sides of a 20cm square tin with baking parchment (the easiest way is to cross 2 x 20cm-long strips over the base). To make the a...',
        description:
          'A classic cake made with almond sponge cake and covered with marzipan. It is traditionally pink and yellow checkered in appearance.',
        thumb:
          'https://ftp.goit.study/img/so-yummy/preview/Bakewell%20tart.jpg',
        ingredients: [
          {
            id: '640c2dd963a319ea671e367e',
            measure: '175g',
          },
          {
            id: '640c2dd963a319ea671e3687',
            measure: '175g',
          },
        ],
        time: '60',
        _id: '66672f866068365d17dd5c06',
        createdAt: '2024-06-10T16:53:26.966Z',
        updatedAt: '2024-06-10T16:53:26.966Z',
      },
      recipePopularRes: {
        total: 3,
        resipes: [
          {
            _id: '6462a8f74c3d0ddd28897ffc',
            count: 2,
            owner: {
              _id: '64c8d958249fae54bae90bb9',
              avatar: null,
              name: 'GoIT',
            },
            title: 'Chicken Parmentier',
            instructions:
              'For the topping, boil the potatoes in salted water until tender. Drain and push through a potato ricer, or mash thoroughly. Stir in the butter, cream and egg yolks. Season and set aside.',
            thumb:
              'https://ftp.goit.study/img/so-yummy/preview/Chicken%20Parmentier.jpg',
          },
          {
            _id: '6462a8f74c3d0ddd28897ff4',
            count: 1,
            owner: {
              _id: '64c8d958249fae54bae90bb9',
              avatar: null,
              name: 'GoIT',
            },
            title: 'Thai Green Curry',
            instructions:
              'Put the potatoes in a pan of boiling water and cook for 5 minutes. Throw in the beans and cook for a further 3 minutes, by which time both should be just tender but not too soft. Drain and put to on...',
            thumb:
              'https://ftp.goit.study/img/so-yummy/preview/Thai%20Green%20Curry.jpg',
          },
          {
            _id: '6462a8f74c3d0ddd2889806c',
            count: 1,
            owner: {
              _id: '64c8d958249fae54bae90bb9',
              avatar: null,
              name: 'GoIT',
            },
            title: 'Big Mac',
            instructions:
              'For the Big Mac sauce, combine all the ingredients in a bowl, season with salt and chill until ready to use.\r\n2. To make the patties, sea.',
            thumb: 'https://ftp.goit.study/img/so-yummy/preview/Big%20Mac.jpg',
          },
        ],
      },
      errorMessageRes: {
        message: 'Error message',
      },
      unauthorizedRes: {
        message: 'Unauthorized',
      },
    },
  },
};

const outputFile = './docs/swagger-output.json';
const routes = ['./app.js'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);
