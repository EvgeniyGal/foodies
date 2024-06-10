import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: 'v1.0.0',
    title: 'Foodies API',
    description: '  ',
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
      userRegisterBody: {
        $name: 'John Doe',
        $email: 'useremail@example.com',
        $password: 'userPassword',
      },
      userRegisterResponse: {
        user: {
          name: 'John Doe',
          email: 'useremail@example.com',
          avatar: 'avatar url',
          token: 'userToken',
        },
      },
      userLoginBody: {
        $email: 'useremail@example.com',
        $password: 'userPassword',
      },
      userLoginResponse: {
        token: 'userToken',
        user: {
          name: 'John Doe',
          email: 'useremail@example.com',
          avatar: 'avatar url',
        },
      },
      userResetPassEmailBody: {
        $email: 'useremail@example.com',
      },
      userNewPassBody: {
        $password: 'userPassword',
      },
      userFollowingsResponse: {
        followings: [
          {
            _id: '6462a6cd4c3d0ddd28897f8e',
            name: 'Ivan',
            avatar: 'avatar url',
            recipesCount: 20,
            recipes: [{ title: 'title', thumb: 'thumb' }],
          },
        ],
      },
      userFollowersResponse: {
        followers: [
          {
            _id: '6462a6cd4c3d0ddd28897f8e',
            name: 'Ivan',
            avatar: 'avatar url',
            recipesCount: 20,
            recipes: [{ title: 'title', thumb: 'thumb' }],
          },
        ],
      },
      userCurrentResponse: {
        _id: '6663f426eb7d2d69e77f78c7',
        name: 'Evgeniy',
        email: 'evgeniygal@gmail.com',
        avatar: '//www.gravatar.com/avatar/eacc007f9c0d2d63e5677f75b3e0f360',
      },
      userByIdResponse: {
        _id: '6663f426eb7d2d69e77f78c7',
        name: 'Evgeniy',
        email: 'evgeniygal@gmail.com',
        avatar: '//www.gravatar.com/avatar/eacc007f9c0d2d63e5677f75b3e0f360',
        followersQty: 0,
        followingQty: 0,
        favRecipesQty: 0,
        recipesQty: 0,
      },
      userPatchAvatarBody: [
        {
          $avatar: 'your image file',
        },
      ],
      userPatchAvatarResponse: [
        {
          avatar: 'avatar url',
        },
      ],
      userRecipesResponse: {
        favRecipes: [
          {
            _id: '6462a6cd4c3d0ddd28897f8e',
            title: 'title',
            instructions: 'instructions',
            thumb: 'thumb',
          },
        ],
      },
      categoriesResponse: [
        {
          _id: '6462a6cd4c3d0ddd28897f8e',
          name: 'Beef',
        },
      ],
      areasResponse: [
        {
          _id: '6462a6f04c3d0ddd28897f9f',
          name: 'Thai',
        },
      ],
      ingredientsResponse: [
        {
          _id: '640c2dd963a319ea671e382c',
          name: 'Pears',
          desc: 'A sweet and juicy fruit with a soft, grainy texture and thin skin.',
          img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e382c.png',
        },
      ],
      testimonialsResponse: [
        {
          _id: '647495d0c825f1570b04182d',
          owner: '64c8d958249fae54bae90bb9',
          testimonial:
            'Foodies has transformed my cooking experience! With its diverse recipe collection and user-friendly interface, I can easily find, save, and cook delicious meals for any occasion. From quick dinners to elaborate feasts, this app has become my go-to kitchen companion. Highly recommended!',
        },
      ],
      recipeResponse: {
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
          'To make the pastry, measure the flour into a bowl and rub in the butter with your fingertips until the mixture resembles fine breadcrumbs. Add the water, mixing to form a soft dough.\r\nRoll out the dough on a lightly floured work surface and use to line a 20cm/8in flan tin. Leave in the fridge to chill for 30 minutes.\r\nPreheat the oven to 200C/400F/Gas 6 (180C fan).\r\nLine the pastry case with foil and fill with baking beans. Bake blind for about 15 minutes, then remove the beans and foil and cook for a further five minutes to dry out the base.\r\nFor the filing, spread the base of the flan generously with raspberry jam.\r\nMelt the butter in a pan, take off the heat and then stir in the sugar. Add ground almonds, egg and almond extract. Pour into the flan tin and sprinkle over the flaked almonds.\r\nBake for about 35 minutes. If the almonds seem to be browning too quickly, cover the tart loosely with foil to prevent them burning.',
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
              _id: '640c2dd963a319ea671e36ad',
              name: 'Cold Water',
              img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e36ad.png',
            },
            measure: '2-3 tbsp',
          },
          {
            id: {
              _id: '640c2dd963a319ea671e3749',
              name: 'Raspberry Jam',
              img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e3749.png',
            },
            measure: '1 tbsp',
          },
          {
            id: {
              _id: '640c2dd963a319ea671e367e',
              name: 'Butter',
              img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e367e.png',
            },
            measure: '125g/4½oz',
          },
          {
            id: {
              _id: '640c2dd963a319ea671e3687',
              name: 'Caster Sugar',
              img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e3687.png',
            },
            measure: '125g/4½oz',
          },
          {
            id: {
              _id: '640c2dd963a319ea671e36f6',
              name: 'Ground Almonds',
              img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e36f6.png',
            },
            measure: '125g/4½oz',
          },
          {
            id: {
              _id: '640c2dd963a319ea671e36da',
              name: 'Free-range Egg, Beaten',
              img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e36da.png',
            },
            measure: '1',
          },
          {
            id: {
              _id: '640c2dd963a319ea671e3861',
              name: 'Almond Extract',
              img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e3861.png',
            },
            measure: '½ tsp',
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
      recipeBody: {
        title: 'Bakewell tart',
        category: '6462a6cd4c3d0ddd28897f8f',
        area: '6462a6f04c3d0ddd28897fa1',
        instructions:
          'To make the pastry, measure the flour into a bowl and rub in the butter with your fingertips until the mixture resembles fine breadcrumbs. Add the water, mixing to form a soft dough.',
        description:
          'A British dessert consisting of a shortcrust pastry shell filled with raspberry jam, frangipane, and topped with almonds.',
        time: '85',
        ingredients: [
          {
            _id: '640c2dd963a319ea671e3743',
            measure: '175g/6oz',
          },
        ],
      },
      recipesResponse: [
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
            'To make the pastry, measure the flour into a bowl and rub in the butter with your fingertips until the mixture resembles fine breadcrumbs. Add the water, mixing to form a soft dough.\r\nRoll out the dough on a lightly floured work surface and use to line a 20cm/8in flan tin. Leave in the fridge to chill for 30 minutes.\r\nPreheat the oven to 200C/400F/Gas 6 (180C fan).\r\nLine the pastry case with foil and fill with baking beans. Bake blind for about 15 minutes, then remove the beans and foil and cook for a further five minutes to dry out the base.\r\nFor the filing, spread the base of the flan generously with raspberry jam.\r\nMelt the butter in a pan, take off the heat and then stir in the sugar. Add ground almonds, egg and almond extract. Pour into the flan tin and sprinkle over the flaked almonds.\r\nBake for about 35 minutes. If the almonds seem to be browning too quickly, cover the tart loosely with foil to prevent them burning.',
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
                _id: '640c2dd963a319ea671e36ad',
                name: 'Cold Water',
                img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e36ad.png',
              },
              measure: '2-3 tbsp',
            },
            {
              id: {
                _id: '640c2dd963a319ea671e3749',
                name: 'Raspberry Jam',
                img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e3749.png',
              },
              measure: '1 tbsp',
            },
            {
              id: {
                _id: '640c2dd963a319ea671e367e',
                name: 'Butter',
                img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e367e.png',
              },
              measure: '125g/4½oz',
            },
            {
              id: {
                _id: '640c2dd963a319ea671e3687',
                name: 'Caster Sugar',
                img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e3687.png',
              },
              measure: '125g/4½oz',
            },
            {
              id: {
                _id: '640c2dd963a319ea671e36f6',
                name: 'Ground Almonds',
                img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e36f6.png',
              },
              measure: '125g/4½oz',
            },
            {
              id: {
                _id: '640c2dd963a319ea671e36da',
                name: 'Free-range Egg, Beaten',
                img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e36da.png',
              },
              measure: '1',
            },
            {
              id: {
                _id: '640c2dd963a319ea671e3861',
                name: 'Almond Extract',
                img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e3861.png',
              },
              measure: '½ tsp',
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
      errorMessage: {
        message: 'Error message',
      },
    },
  },
};

const outputFile = './docs/swagger-output.json';
const routes = ['./app.js'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);
