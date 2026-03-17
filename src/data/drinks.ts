import { Drink } from '../types';

export const drinks: Drink[] = [
  {
    id: 'irish-coffee',
    name: 'Irish Coffee',
    type: 'Hot Cocktail',
    seasons: ['Winter', 'Spring', 'Autumn'],
    temperatures: ['cold', 'mild'],
    weathers: ['rainy', 'cloudy', 'any'],
    description: 'A classic blend of hot coffee, Irish whiskey, sugar, and topped with thick cream.',
    icon: '☕',
    why: 'Perfect for warming up on a damp Irish day.',
    howToMake: [
      'Pre-heat a heatproof glass with hot water.',
      'Add 35ml of Irish whiskey and 2 teaspoons of brown sugar.',
      'Fill with strong hot coffee, leaving space for the cream.',
      'Stir until the sugar is dissolved.',
      'Lightly whip double cream and pour it over the back of a spoon to float on top.'
    ],
    container: {
      name: 'Georgian Irish Coffee Glass',
      reason: 'The stemmed glass allows you to see the beautiful layers of black coffee and white cream, while the handle keeps your hands safe from the heat.'
    }
  },
  {
    id: 'hot-whiskey',
    name: 'Hot Whiskey (Hot Toddy)',
    type: 'Hot Drink',
    seasons: ['Winter', 'Autumn'],
    temperatures: ['cold'],
    weathers: ['rainy', 'any'],
    description: 'Irish whiskey, hot water, lemon, cloves, and a touch of honey or sugar.',
    icon: '🍋',
    why: 'The ultimate remedy for a cold winter evening.',
    howToMake: [
      'Stick 3-4 cloves into a slice of lemon.',
      'Place the lemon slice in a heatproof glass or mug.',
      'Add 50ml of Irish whiskey and a teaspoon of honey or sugar.',
      'Top with boiling water and stir gently.'
    ],
    container: {
      name: 'Heatproof Glass Mug',
      reason: 'A sturdy glass mug retains the heat of the water while allowing the aromatic steam from the cloves and lemon to rise towards you.'
    }
  },
  {
    id: 'guinness',
    name: 'Guinness Stout',
    type: 'Stout',
    seasons: ['Winter', 'Spring', 'Autumn', 'Summer'],
    temperatures: ['cold', 'mild', 'warm'],
    weathers: ['any'],
    description: 'The iconic dark Irish dry stout with a creamy head.',
    icon: '🍺',
    why: 'A timeless choice that suits any Irish season.',
    howToMake: [
      'Hold a clean, dry glass at a 45-degree angle.',
      'Pour until the glass is three-quarters full.',
      'Allow the stout to settle for about 119.5 seconds.',
      'Top up the glass, pushing the tap forward to create a perfect creamy head.'
    ],
    container: {
      name: 'Guinness Tulip Pint Glass',
      reason: 'The tulip shape is specifically designed to control the flow of the stout and support the formation of the iconic creamy head.'
    }
  },
  {
    id: 'bulmers-cider',
    name: 'Irish Cider (Bulmers/Magners)',
    type: 'Cider',
    seasons: ['Summer', 'Spring'],
    temperatures: ['warm', 'mild'],
    weathers: ['clear', 'any'],
    description: 'Crisp, refreshing apple cider served over plenty of ice.',
    icon: '🍎',
    why: 'Nothing beats a cold cider when the Irish sun finally makes an appearance.',
    howToMake: [
      'Fill a large glass to the brim with fresh ice cubes.',
      'Pour the chilled cider over the ice.',
      'Garnish with a slice of fresh green apple if desired.'
    ],
    container: {
      name: 'Tall Highball Glass',
      reason: 'A tall glass accommodates plenty of ice, which is essential for keeping the cider crisp and refreshing in the summer heat.'
    }
  },
  {
    id: 'whiskey-old-fashioned',
    name: 'Whiskey Old Fashioned',
    type: 'Cocktail',
    seasons: ['Autumn', 'Winter'],
    temperatures: ['cold', 'mild'],
    weathers: ['clear', 'any'],
    description: 'Irish whiskey, bitters, sugar, and an orange twist.',
    icon: '🥃',
    why: 'A sophisticated, warming drink for long autumn nights.',
    howToMake: [
      'Muddle a sugar cube with 3 dashes of Angostura bitters in a glass.',
      'Add 50ml of Irish whiskey and a few large ice cubes.',
      'Stir gently for about 30 seconds to dilute and chill.',
      'Express the oils from an orange peel over the glass and drop it in.'
    ],
    container: {
      name: 'Rocks Glass (Lowball)',
      reason: 'The wide brim allows the complex aromas of the whiskey and orange oils to breathe, while the heavy base is perfect for muddling.'
    }
  },
  {
    id: 'gin-elderflower',
    name: 'Gin & Elderflower Tonic',
    type: 'Cocktail',
    seasons: ['Summer', 'Spring'],
    temperatures: ['warm'],
    weathers: ['clear'],
    description: 'Irish craft gin, elderflower liqueur, tonic water, and fresh cucumber.',
    icon: '🍸',
    why: 'Light, floral, and perfect for a bright summer day.',
    howToMake: [
      'Fill a balloon glass with ice.',
      'Add 50ml of Irish gin and 15ml of elderflower liqueur.',
      'Top with premium tonic water.',
      'Garnish with a thin ribbon of cucumber and a sprig of mint.'
    ],
    container: {
      name: 'Copa de Balon (Balloon Glass)',
      reason: 'The large, rounded bowl captures the delicate floral aromas of the elderflower and gin, enhancing the sensory experience.'
    }
  },
  {
    id: 'baileys-ice',
    name: 'Baileys on Ice',
    type: 'Liqueur',
    seasons: ['Winter', 'Autumn'],
    temperatures: ['mild', 'cold'],
    weathers: ['any'],
    description: 'Smooth Irish cream liqueur served simply over ice.',
    icon: '🥛',
    why: 'A sweet, comforting treat for a cozy night in.',
    howToMake: [
      'Place 2-3 large ice cubes in a glass.',
      'Pour 50ml of Baileys Irish Cream over the ice.',
      'Wait a moment for it to chill before sipping.'
    ],
    container: {
      name: 'Tumbler Glass',
      reason: 'A simple tumbler is perfect for a short, slow-sipping drink, allowing the ice to slowly melt into the rich cream.'
    }
  },
  {
    id: 'smithwicks',
    name: 'Smithwick’s Red Ale',
    type: 'Ale',
    seasons: ['Autumn', 'Spring'],
    temperatures: ['mild'],
    weathers: ['cloudy', 'any'],
    description: 'A clear beer with a rich ruby color and creamy head.',
    icon: '🍺',
    why: 'A balanced ale that fits the transitional seasons perfectly.',
    howToMake: [
      'Rinse a clean pint glass with cold water.',
      'Pour the ale at a slight angle to control the head.',
      'Serve at a cool, but not freezing, temperature to appreciate the malt flavors.'
    ],
    container: {
      name: 'Nonic Pint Glass',
      reason: 'The bulge near the top provides a better grip and prevents the rims from chipping, making it a classic choice for a hearty Irish ale.'
    }
  }
];
