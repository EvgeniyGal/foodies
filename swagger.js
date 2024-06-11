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
        title: 'Fassst cake',
        category: '6462a6cd4c3d0ddd28897f8f',
        owner: '6664addd6597c31134125d1e',
        area: '6462a6f04c3d0ddd28897f9f',
        instructions:
          'Heat oven to 180C/160C fan/gas 4 and line the base and sides of a 20cm square tin with baking parchment (the easiest way is to cross 2 x 20cm-long strips over the base). To make the almond sponge, put the butter, sugar, flour, ground almonds, baking powder, eggs, vanilla and almond extract in a large bowl. Beat with an electric whisk until the mix comes together smoothly. Scrape into the tin, spreading to the corners, and bake for 25-30 mins – when you poke in a skewer, it should come out clean. Cool in the tin for 10 mins, then transfer to a wire rack to finish cooling while you make the second sponge.\\r\\nFor the pink sponge, line the tin as above. Mix all the ingredients together as above, but don’t add the almond extract. Fold in some pink food colouring. Then scrape it all into the tin and bake as before. Cool.\\r\\nTo assemble, heat the jam in a small pan until runny, then sieve. Barely trim two opposite edges from the almond sponge, then well trim a third edge. Roughly measure the height of the sponge, then cutting from the well-trimmed edge, use a ruler to help you cut 4 slices each the same width as the sponge height. Discard or nibble leftover sponge. Repeat with pink cake.\\r\\nTake 2 x almond slices and 2 x pink slices and trim so they are all the same length. Roll out one marzipan block on a surface lightly dusted with icing sugar to just over 20cm wide, then keep rolling lengthways until the marzipan is roughly 0.5cm thick. Brush with apricot jam, then lay a pink and an almond slice side by side at one end of the marzipan, brushing jam in between to stick sponges, and leaving 4cm clear marzipan at the end. Brush more jam on top of the sponges, then sandwich remaining 2 slices on top, alternating colours to give a checkerboard effect. Trim the marzipan to the length of the cakes.\\r\\nCarefully lift up the marzipan and smooth over the cake with your hands, but leave a small marzipan fold along the bottom edge before you stick it to the first side. Trim opposite side to match size of fold, then crimp edges using fingers and thumb (or, more simply, press with prongs of fork). If you like, mark the 10 slices using the prongs of a fork.\\r\\nAssemble second Battenberg and keep in an airtight box or well wrapped in cling film for up to 3 days. Can be frozen for up to a month.',
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
          {
            id: {
              $oid: '640c2dd963a319ea671e3762',
            },
            measure: '140g',
          },
          {
            id: {
              $oid: '640c2dd963a319ea671e3814',
            },
            measure: '50g',
          },
          {
            id: {
              $oid: '640c2dd963a319ea671e3665',
            },
            measure: '½ tsp',
          },
          {
            id: {
              $oid: '640c2dd963a319ea671e36ca',
            },
            measure: '3 Medium',
          },
          {
            id: {
              $oid: '640c2dd963a319ea671e3786',
            },
            measure: '½ tsp',
          },
          {
            id: {
              $oid: '640c2dd963a319ea671e3861',
            },
            measure: '¼ teaspoon',
          },
          {
            id: {
              $oid: '640c2dd963a319ea671e380f',
            },
            measure: '½ tsp',
          },
          {
            id: {
              $oid: '640c2dd963a319ea671e37bf',
            },
            measure: '200g',
          },
          {
            id: {
              $oid: '640c2dd963a319ea671e3813',
            },
            measure: '1kg',
          },
          {
            id: {
              $oid: '640c2dd963a319ea671e379d',
            },
            measure: 'Dusting',
          },
        ],
        time: '60',
      },
      recipesResponse: {
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
      },
      recipeResponsePost: {
        title: 'Fassst cake',
        category: '6462a6cd4c3d0ddd28897f8f',
        owner: '6664addd6597c31134125d1e',
        area: '6462a6f04c3d0ddd28897f9f',
        instructions:
          'Heat oven to 180C/160C fan/gas 4 and line the base and sides of a 20cm square tin with baking parchment (the easiest way is to cross 2 x 20cm-long strips over the base). To make the almond sponge, put the butter, sugar, flour, ground almonds, baking powder, eggs, vanilla and almond extract in a large bowl. Beat with an electric whisk until the mix comes together smoothly. Scrape into the tin, spreading to the corners, and bake for 25-30 mins – when you poke in a skewer, it should come out clean. Cool in the tin for 10 mins, then transfer to a wire rack to finish cooling while you make the second sponge.\\r\\nFor the pink sponge, line the tin as above. Mix all the ingredients together as above, but don’t add the almond extract. Fold in some pink food colouring. Then scrape it all into the tin and bake as before. Cool.\\r\\nTo assemble, heat the jam in a small pan until runny, then sieve. Barely trim two opposite edges from the almond sponge, then well trim a third edge. Roughly measure the height of the sponge, then cutting from the well-trimmed edge, use a ruler to help you cut 4 slices each the same width as the sponge height. Discard or nibble leftover sponge. Repeat with pink cake.\\r\\nTake 2 x almond slices and 2 x pink slices and trim so they are all the same length. Roll out one marzipan block on a surface lightly dusted with icing sugar to just over 20cm wide, then keep rolling lengthways until the marzipan is roughly 0.5cm thick. Brush with apricot jam, then lay a pink and an almond slice side by side at one end of the marzipan, brushing jam in between to stick sponges, and leaving 4cm clear marzipan at the end. Brush more jam on top of the sponges, then sandwich remaining 2 slices on top, alternating colours to give a checkerboard effect. Trim the marzipan to the length of the cakes.\\r\\nCarefully lift up the marzipan and smooth over the cake with your hands, but leave a small marzipan fold along the bottom edge before you stick it to the first side. Trim opposite side to match size of fold, then crimp edges using fingers and thumb (or, more simply, press with prongs of fork). If you like, mark the 10 slices using the prongs of a fork.\\r\\nAssemble second Battenberg and keep in an airtight box or well wrapped in cling film for up to 3 days. Can be frozen for up to a month.',
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
          {
            id: {
              $oid: '640c2dd963a319ea671e3762',
            },
            measure: '140g',
          },
          {
            id: {
              $oid: '640c2dd963a319ea671e3814',
            },
            measure: '50g',
          },
          {
            id: {
              $oid: '640c2dd963a319ea671e3665',
            },
            measure: '½ tsp',
          },
          {
            id: {
              $oid: '640c2dd963a319ea671e36ca',
            },
            measure: '3 Medium',
          },
          {
            id: {
              $oid: '640c2dd963a319ea671e3786',
            },
            measure: '½ tsp',
          },
          {
            id: {
              $oid: '640c2dd963a319ea671e3861',
            },
            measure: '¼ teaspoon',
          },
          {
            id: {
              $oid: '640c2dd963a319ea671e380f',
            },
            measure: '½ tsp',
          },
          {
            id: {
              $oid: '640c2dd963a319ea671e37bf',
            },
            measure: '200g',
          },
          {
            id: {
              $oid: '640c2dd963a319ea671e3813',
            },
            measure: '1kg',
          },
          {
            id: {
              $oid: '640c2dd963a319ea671e379d',
            },
            measure: 'Dusting',
          },
        ],
        time: '60',
        _id: '66672f866068365d17dd5c06',
        createdAt: '2024-06-10T16:53:26.966Z',
        updatedAt: '2024-06-10T16:53:26.966Z',
      },
      popularRecipes: {
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
              'For the topping, boil the potatoes in salted water until tender. Drain and push through a potato ricer, or mash thoroughly. Stir in the butter, cream and egg yolks. Season and set aside.\r\nFor the filling, melt the butter in a large pan. Add the shallots, carrots and celery and gently fry until soft, then add the garlic. Pour in the wine and cook for 1 minute. Stir in the tomato purée, chopped tomatoes and stock and cook for 10–15 minutes, until thickened. Add the shredded chicken, olives and parsley. Season to taste with salt and pepper.\r\nPreheat the oven to 180C/160C Fan/Gas 4.\r\nPut the filling in a 20x30cm/8x12in ovenproof dish and top with the mashed potato. Grate over the Gruyère. Bake for 30–35 minutes, until piping hot and the potato is golden-brown.',
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
              'Put the potatoes in a pan of boiling water and cook for 5 minutes. Throw in the beans and cook for a further 3 minutes, by which time both should be just tender but not too soft. Drain and put to one side.\r\nIn a wok or large frying pan, heat the oil until very hot, then drop in the garlic and cook until golden, this should take only a few seconds. Don’t let it go very dark or it will spoil the taste. Spoon in the curry paste and stir it around for a few seconds to begin to cook the spices and release all the flavours. Next, pour in the coconut milk and let it come to a bubble.\r\nStir in the fish sauce and sugar, then the pieces of chicken. Turn the heat down to a simmer and cook, covered, for about 8 minutes until the chicken is cooked.\r\nTip in the potatoes and beans and let them warm through in the hot coconut milk, then add a lovely citrussy flavour by stirring in the shredded lime leaves (or lime zest). The basil leaves go in next, but only leave them briefly on the heat or they will quickly lose their brightness. Scatter with the lime garnish and serve immediately with boiled rice.',
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
              'For the Big Mac sauce, combine all the ingredients in a bowl, season with salt and chill until ready to use.\r\n2. To make the patties, season the mince with salt and pepper and form into 4 balls using about 1/3 cup mince each. Place each onto a square of baking paper and flatten to form into four x 15cm circles. Heat oil in a large frypan over high heat. In 2 batches, cook beef patties for 1-2 minutes each side until lightly charred and cooked through. Remove from heat and keep warm. Repeat with remaining two patties.\r\n3. Carefully slice each burger bun into three acrossways, then lightly toast.\r\n4. To assemble the burgers, spread a little Big Mac sauce over the bottom base. Top with some chopped onion, shredded lettuce, slice of cheese, beef patty and some pickle slices. Top with the middle bun layer, and spread with more Big Mac sauce, onion, lettuce, pickles, beef patty and then finish with more sauce. Top with burger lid to serve.\r\n5. After waiting half an hour for your food to settle, go for a jog.',
            thumb: 'https://ftp.goit.study/img/so-yummy/preview/Big%20Mac.jpg',
          },
        ],
      },
      errorMessage: {
        message: 'Error message',
      },
    },
  },
};

const outputFile = './docs/swagger-output.json';
const routes = ['./app.js'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);
