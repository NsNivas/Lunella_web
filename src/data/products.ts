import type { Category, Product, Review, Offer, MockOrder } from '../types';

export const categories: Category[] = [
  {
    id: 'beauty',
    name: 'Cosmetics',
    description: 'Makeup, skincare & fragrances',
    image: 'https://images.pexels.com/photos/3750640/pexels-photo-3750640.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    subTypes: ['Lipstick', 'Lip Gloss', 'Foundation', 'Concealer', 'Blush', 'Mascara', 'Eyeliner', 'Eyeshadow', 'Serum', 'Moisturizer', 'Cleanser', 'Sunscreen', 'Perfume', 'Highlighter', 'Brushes'],
  },
  {
    id: 'fashion',
    name: 'Fashion',
    description: 'Tops, dresses, denim & more',
    image: 'https://images.pexels.com/photos/18533667/pexels-photo-18533667.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    subTypes: ['Top', 'Dress', 'Kurti', 'Jeans', 'Skirt', 'Co-ord Set', 'Shirt', 'Blouse', 'Cardigan', 'Jacket'],
  },
  {
    id: 'footwear',
    name: 'Footwear',
    description: 'Heels, sandals, sneakers & flats',
    image: 'https://images.pexels.com/photos/27063075/pexels-photo-27063075.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    subTypes: ['Heels', 'Sandals', 'Sneakers', 'Flats', 'Slippers', 'Boots', 'Wedges', 'Mules'],
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Jewelry, watches & sunglasses',
    image: 'https://images.pexels.com/photos/8891953/pexels-photo-8891953.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    subTypes: ['Earrings', 'Necklace', 'Bracelet', 'Ring', 'Watch', 'Sunglasses'],
  },
  {
    id: 'bags',
    name: 'Bags',
    description: 'Handbags, totes & clutches',
    image: 'https://images.pexels.com/photos/27204288/pexels-photo-27204288.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    subTypes: ['Handbag', 'Sling Bag', 'Tote', 'Shoulder Bag', 'Mini Bag', 'Wallet', 'Crossbody', 'Clutch'],
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    description: 'Hair accessories & daily essentials',
    image: 'https://images.pexels.com/photos/3373741/pexels-photo-3373741.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    subTypes: ['Scrunchie', 'Hair Clip', 'Hair Band', 'Hair Brush', 'Cosmetic Tool'],
  },
];

const beautyImages = [
  // Lipsticks
  'https://images.pexels.com/photos/25906586/pexels-photo-25906586.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Lip Gloss
  'https://images.pexels.com/photos/3373741/pexels-photo-3373741.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Foundation
  'https://images.pexels.com/photos/1776331/pexels-photo-1776331.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Concealer
  'https://images.pexels.com/photos/6527700/pexels-photo-6527700.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Blush
  'https://images.pexels.com/photos/10044948/pexels-photo-10044948.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Mascara
  'https://images.pexels.com/photos/3373725/pexels-photo-3373725.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Eyeliner
  'https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Eyeshadow Palette
  'https://images.pexels.com/photos/30634963/pexels-photo-30634963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Serum (Vitamin C)
  'https://images.pexels.com/photos/4841179/pexels-photo-4841179.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Moisturizer
  'https://images.pexels.com/photos/4841478/pexels-photo-4841478.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Cleanser
  'https://images.pexels.com/photos/27272550/pexels-photo-27272550.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Sunscreen
  'https://images.pexels.com/photos/33538444/pexels-photo-33538444.png?auto=compress&cs=tinysrgb&h=650&w=940',
  // Perfume
  'https://images.pexels.com/photos/29982967/pexels-photo-29982967.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Highlighter / compact
  'https://images.pexels.com/photos/10044947/pexels-photo-10044947.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Brushes
  'https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Satin Nude Lipstick
  'https://images.pexels.com/photos/7664873/pexels-photo-7664873.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Mirror Shine Lip Gloss
  'https://images.pexels.com/photos/6527704/pexels-photo-6527704.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Luminous Silk Foundation
  'https://images.pexels.com/photos/36339062/pexels-photo-36339062.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Color Correct Concealer
  'https://images.pexels.com/photos/6527698/pexels-photo-6527698.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Sunset Blush Duo
  'https://images.pexels.com/photos/6527699/pexels-photo-6527699.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Curl Definition Mascara
  'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Smudge-Proof Eyeliner
  'https://images.pexels.com/photos/6527702/pexels-photo-6527702.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Bronze Glow Palette
  'https://images.pexels.com/photos/6233285/pexels-photo-6233285.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Retinol Night Serum
  'https://images.pexels.com/photos/39400913/pexels-photo-39400913.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Rosewater Body Mist
  'https://images.pexels.com/photos/19644204/pexels-photo-19644204.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const fashionImages = [
  'https://images.pexels.com/photos/27677903/pexels-photo-27677903.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27383810/pexels-photo-27383810.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/11825629/pexels-photo-11825629.png?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/10909197/pexels-photo-10909197.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/8086404/pexels-photo-8086404.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/31046837/pexels-photo-31046837.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/30661782/pexels-photo-30661782.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/14724697/pexels-photo-14724697.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/34921744/pexels-photo-34921744.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/14275812/pexels-photo-14275812.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/39168902/pexels-photo-39168902.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/9942927/pexels-photo-9942927.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/35661020/pexels-photo-35661020.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7778888/pexels-photo-7778888.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/18533667/pexels-photo-18533667.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const footwearImages = [
  'https://images.pexels.com/photos/27046154/pexels-photo-27046154.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27046150/pexels-photo-27046150.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27063075/pexels-photo-27063075.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27113458/pexels-photo-27113458.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/26796155/pexels-photo-26796155.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/26796156/pexels-photo-26796156.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27113460/pexels-photo-27113460.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/26965813/pexels-photo-26965813.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/26925260/pexels-photo-26925260.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/26856059/pexels-photo-26856059.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27100514/pexels-photo-27100514.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27100549/pexels-photo-27100549.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/26965814/pexels-photo-26965814.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/26925262/pexels-photo-26925262.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/26965821/pexels-photo-26965821.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const accessoryImages = [
  'https://images.pexels.com/photos/8891953/pexels-photo-8891953.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/34444209/pexels-photo-34444209.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/29502496/pexels-photo-29502496.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/29502955/pexels-photo-29502955.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/29503018/pexels-photo-29503018.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/34444133/pexels-photo-34444133.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/29502923/pexels-photo-29502923.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/8891961/pexels-photo-8891961.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/29503017/pexels-photo-29503017.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/8891952/pexels-photo-8891952.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/8891955/pexels-photo-8891955.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/29502924/pexels-photo-29502924.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6716443/pexels-photo-6716443.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7093769/pexels-photo-7093769.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/21235147/pexels-photo-21235147.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const bagImages = [
  'https://images.pexels.com/photos/27204288/pexels-photo-27204288.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27174573/pexels-photo-27174573.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27046146/pexels-photo-27046146.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27204287/pexels-photo-27204287.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27046147/pexels-photo-27046147.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27174557/pexels-photo-27174557.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/26736140/pexels-photo-26736140.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27174539/pexels-photo-27174539.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27503507/pexels-photo-27503507.png?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/26954376/pexels-photo-26954376.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/26954381/pexels-photo-26954381.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27174548/pexels-photo-27174548.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27046145/pexels-photo-27046145.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27174544/pexels-photo-27174544.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/26954371/pexels-photo-26954371.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const lifestyleImages = [
  'https://images.pexels.com/photos/3373741/pexels-photo-3373741.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6575023/pexels-photo-6575023.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7020255/pexels-photo-7020255.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6167808/pexels-photo-6167808.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6233285/pexels-photo-6233285.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/3750640/pexels-photo-3750640.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/25906586/pexels-photo-25906586.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6666403/pexels-photo-6666403.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6527700/pexels-photo-6527700.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/3373722/pexels-photo-3373722.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/301367/pexels-photo-301367.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/10044947/pexels-photo-10044947.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6527699/pexels-photo-6527699.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/39627346/pexels-photo-39627346.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const watchImages = [
  'https://images.pexels.com/photos/6157411/pexels-photo-6157411.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6157408/pexels-photo-6157408.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/12835320/pexels-photo-12835320.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/9561299/pexels-photo-9561299.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/12835314/pexels-photo-12835314.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/12835312/pexels-photo-12835312.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/12835318/pexels-photo-12835318.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/9261531/pexels-photo-9261531.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/13548997/pexels-photo-13548997.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const allColors = ['Rose', 'Ivory', 'Charcoal', 'Blush', 'Mauve', 'Navy', 'Olive', 'Burgundy', 'Black', 'Beige', 'Peach', 'Sage'];
const apparelSizes = ['XS', 'S', 'M', 'L', 'XL'];
const shoeSizes = ['36', '37', '38', '39', '40', '41'];
const beautyColors = ['Natural', 'Rose', 'Coral', 'Berry', 'Mauve', 'Nude'];

function pick<T>(arr: T[], i: number): T {
  return arr[i % arr.length];
}

type NameEntry = [string, string];

const beautyNames: NameEntry[] = [
  ['Velvet Matte Lipstick', 'Lipstick'], ['Glossy Lip Plumper', 'Lip Gloss'], ['Silk Foundation SPF15', 'Foundation'],
  ['Bright Awake Concealer', 'Concealer'], ['Petal Cheek Blush', 'Blush'], ['Volume Lift Mascara', 'Mascara'],
  ['Precision Ink Eyeliner', 'Eyeliner'], ['Twilight Eyeshadow Palette', 'Eyeshadow'], ['Radiance Vitamin C Serum', 'Serum'],
  ['Hydra Glow Moisturizer', 'Moisturizer'], ['Gentle Foam Cleanser', 'Cleanser'], ['SunShield SPF50 Sunscreen', 'Sunscreen'],
  ['Bloom Eau de Parfum', 'Perfume'], ['Strobe Liquid Highlighter', 'Highlighter'], ['Pro Makeup Brush Set', 'Brushes'],
  ['Satin Nude Lipstick', 'Lipstick'], ['Mirror Shine Lip Gloss', 'Lip Gloss'], ['Luminous Silk Foundation', 'Foundation'],
  ['Color Correct Concealer', 'Concealer'], ['Sunset Blush Duo', 'Blush'], ['Curl Definition Mascara', 'Mascara'],
  ['Smudge-Proof Eyeliner', 'Eyeliner'], ['Bronze Glow Palette', 'Eyeshadow'], ['Retinol Night Serum', 'Serum'],
  ['Rosewater Body Mist', 'Perfume'],
];

const fashionNames: NameEntry[] = [
  ['Linen Wrap Top', 'Top'], ['Floral Midi Dress', 'Dress'], ['Embroidered Kurti', 'Kurti'], ['High-Rise Skinny Jeans', 'Jeans'],
  ['Pleated A-Line Skirt', 'Skirt'], ['Lounge Co-ord Set', 'Co-ord Set'], ['Cotton Button Shirt', 'Shirt'], ['Ruffle Trim Blouse', 'Blouse'],
  ['Chunky Knit Cardigan', 'Cardigan'], ['Cropped Denim Jacket', 'Jacket'], ['Silk Slip Dress', 'Dress'], ['Off-Shoulder Top', 'Top'],
  ['Wide-Leg Jeans', 'Jeans'], ['Tiered Maxi Skirt', 'Skirt'], ['Printed Rayon Kurti', 'Kurti'], ['Ribbed Co-ord Set', 'Co-ord Set'],
  ['Striped Oxford Shirt', 'Shirt'], ['Peasant Blouse', 'Blouse'], ['Open-Front Cardigan', 'Cardigan'], ['Quilted Bomber Jacket', 'Jacket'],
  ['Wrap Midi Dress', 'Dress'], ['Boatneck Top', 'Top'], ['Boyfriend Jeans', 'Jeans'], ['Denim Mini Skirt', 'Skirt'],
  ['Anarkali Kurti', 'Kurti'],
];

const footwearNames: NameEntry[] = [
  ['Strappy Block Heels', 'Heels'], ['Dual Strap Sandals', 'Sandals'], ['Canvas Sneakers', 'Sneakers'], ['Ballet Flats', 'Flats'],
  ['Fuzzy House Slippers', 'Slippers'], ['Ankle Length Boots', 'Boots'], ['Cork Wedges', 'Wedges'], ['Slip-On Mules', 'Mules'],
  ['Pointed Stiletto Heels', 'Heels'], ['Gladiator Sandals', 'Sandals'], ['Retro Running Sneakers', 'Sneakers'], ['Loafer Flats', 'Flats'],
  ['Memory Foam Slippers', 'Slippers'], ['Knee-High Boots', 'Boots'], ['Platform Wedges', 'Wedges'], ['Suede Mules', 'Mules'],
  ['Kitten Heels', 'Heels'], ['Flip-Flop Sandals', 'Sandals'], ['Slip-On Sneakers', 'Sneakers'], ['Pointed Flats', 'Flats'],
  ['Faux Fur Slippers', 'Slippers'], ['Chelsea Boots', 'Boots'], ['Espadrille Wedges', 'Wedges'], ['Block Heel Mules', 'Mules'],
  ['Slingback Heels', 'Heels'],
];

const accessoryNames: NameEntry[] = [
  ['Pearl Drop Earrings', 'Earrings'], ['Layered Gold Necklace', 'Necklace'], ['Charm Bracelet', 'Bracelet'], ['Crystal Stack Ring', 'Ring'],
  ['Minimalist Leather Watch', 'Watch'], ['Cat-Eye Sunglasses', 'Sunglasses'], ['Hoop Earrings', 'Earrings'], ['Heart Pendant Necklace', 'Necklace'],
  ['Tennis Bracelet', 'Bracelet'], ['Birthstone Ring', 'Ring'], ['Rose Gold Watch', 'Watch'], ['Aviator Sunglasses', 'Sunglasses'],
  ['Stud Earrings', 'Earrings'], ['Choker Necklace', 'Necklace'], ['Bangle Bracelet', 'Bracelet'], ['Adjustable Ring', 'Ring'],
  ['Gold-Plated Watch', 'Watch'], ['Round Sunglasses', 'Sunglasses'], ['Tassel Earrings', 'Earrings'], ['Statement Necklace', 'Necklace'],
  ['Chain Bracelet', 'Bracelet'], ['Cluster Ring', 'Ring'], ['Classic Black Watch', 'Watch'], ['Oversized Sunglasses', 'Sunglasses'],
  ['Geometric Earrings', 'Earrings'],
];

const bagNames: NameEntry[] = [
  ['Classic Leather Handbag', 'Handbag'], ['Quilted Sling Bag', 'Sling Bag'], ['Canvas Tote Bag', 'Tote'], ['Structured Shoulder Bag', 'Shoulder Bag'],
  ['Mini Box Bag', 'Mini Bag'], ['Bifold Wallet', 'Wallet'], ['Compact Crossbody Bag', 'Crossbody'], ['Evening Clutch', 'Clutch'],
  ['Saffiano Handbag', 'Handbag'], ['Chain Sling Bag', 'Sling Bag'], ['Jute Tote Bag', 'Tote'], ['Soft Shoulder Bag', 'Shoulder Bag'],
  ['Mini Quilted Bag', 'Mini Bag'], ['Long Wallet', 'Wallet'], ['Fringe Crossbody Bag', 'Crossbody'], ['Metallic Clutch', 'Clutch'],
  ['Tote Handbag', 'Handbag'], ['Mini Sling Bag', 'Sling Bag'], ['Leather Tote Bag', 'Tote'], ['Bucket Shoulder Bag', 'Shoulder Bag'],
  ['Mini Round Bag', 'Mini Bag'], ['Card Case Wallet', 'Wallet'], ['Saddle Crossbody Bag', 'Crossbody'], ['Pearl Clutch', 'Clutch'],
  ['Top-Handle Handbag', 'Handbag'],
];

const lifestyleNames: NameEntry[] = [
  ['Silk Scrunchie Set', 'Scrunchie'], ['Pearl Hair Clip', 'Hair Clip'], ['Knotted Hair Band', 'Hair Band'], ['Detangler Hair Brush', 'Hair Brush'],
  ['Velvet Scrunchie', 'Scrunchie'], ['Tortoise Hair Clip', 'Hair Clip'], ['Satin Hair Band', 'Hair Band'], ['Paddle Hair Brush', 'Hair Brush'],
  ['Satin Pillow Scrunchie', 'Scrunchie'], ['Floral Hair Clip', 'Hair Clip'], ['Wide Hair Band', 'Hair Band'], ['Round Brush', 'Hair Brush'],
  ['Chiffon Scrunchie', 'Scrunchie'], ['Butterfly Hair Clip', 'Hair Clip'], ['Elastic Hair Band Set', 'Hair Band'], ['Boar Bristle Brush', 'Hair Brush'],
  ['Sequin Scrunchie', 'Scrunchie'], ['Geometric Hair Clip', 'Hair Clip'], ['Twist Hair Band', 'Hair Band'], ['Teasing Brush', 'Hair Brush'],
  ['Lace Scrunchie', 'Scrunchie'], ['Rhinestone Hair Clip', 'Hair Clip'], ['Spring Hair Band', 'Hair Band'], ['Mini Detangler Brush', 'Hair Brush'],
  ['Everyday Scrunchie Pack', 'Scrunchie'],
];

function generateProducts(): Product[] {
  const products: Product[] = [];
  const categoryDefs: { id: string; label: string; names: [string, string][]; images: string[]; sizes?: string[]; colors: string[] }[] = [
    { id: 'beauty', label: 'Cosmetics', names: beautyNames, images: beautyImages, colors: beautyColors },
    { id: 'fashion', label: 'Fashion', names: fashionNames, images: fashionImages, sizes: apparelSizes, colors: allColors },
    { id: 'footwear', label: 'Footwear', names: footwearNames, images: footwearImages, sizes: shoeSizes, colors: allColors },
    { id: 'accessories', label: 'Accessories', names: accessoryNames, images: [...accessoryImages, ...watchImages], colors: allColors },
    { id: 'bags', label: 'Bags', names: bagNames, images: bagImages, colors: allColors },
    { id: 'lifestyle', label: 'Lifestyle', names: lifestyleNames, images: lifestyleImages, colors: allColors },
  ];

  categoryDefs.forEach((cat) => {
    cat.names.forEach((entry, i) => {
      const [name, subType] = entry;
      const baseImg = pick(cat.images, i);
      const images = [baseImg, pick(cat.images, i + 3), pick(cat.images, i + 7), pick(cat.images, i + 5)];
      const price = Math.floor(Math.random() * 2000) + 199;
      const discountPct = Math.floor(Math.random() * 5) * 5 + 10;
      const originalPrice = Math.floor(price / (1 - discountPct / 100));
      const rating = Math.round((Math.random() * 1.5 + 3.5) * 10) / 10;
      const reviewCount = Math.floor(Math.random() * 1500) + 30;
      const inStock = i % 11 !== 0;
      const featured = i < 8 && cat.id === 'beauty' ? false : i % 5 === 0;
      const trending = i % 4 === 0;
      const isNew = i % 6 === 2;

      products.push({
        id: `${cat.id}-${i + 1}`,
        name,
        category: cat.id as any,
        categoryLabel: cat.label,
        subType,
        price,
        originalPrice,
        discount: discountPct,
        rating,
        reviewCount,
        image: baseImg,
        images,
        description: `The ${name} is crafted for the modern woman. Designed with premium materials and an eye for detail, this ${subType.toLowerCase()} blends style with everyday comfort. A must-have addition to your ${cat.label.toLowerCase()} collection.`,
        colors: cat.colors.slice(i % 4, (i % 4) + 4),
        sizes: cat.sizes,
        inStock,
        featured: cat.id === 'beauty' ? i % 7 === 0 : i % 6 === 0,
        trending: cat.id === 'beauty' ? i % 4 === 0 : i % 3 === 0,
        isNew: cat.id === 'beauty' ? i % 5 === 0 : i % 4 === 1,
        details: `Premium quality ${subType.toLowerCase()} with a soft-touch finish. Designed to complement every occasion. Care: Keep away from water and harsh chemicals. Store in a cool, dry place.`,
      });
    });
  });

  return products;
}

export const products: Product[] = generateProducts();

export const reviews: Review[] = [
  { id: 'r1', name: 'Aanya Sharma', avatar: 'https://images.pexels.com/photos/2090658/pexels-photo-2090658.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', rating: 5, text: 'Absolutely in love with my order! The quality is stunning and delivery was super quick. LUNELLE has become my go-to.', product: 'Velvet Matte Lipstick', date: '2 weeks ago' },
  { id: 'r2', name: 'Priya Nair', avatar: 'https://images.pexels.com/photos/1183453/pexels-photo-1183453.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', rating: 5, text: 'The fabric feels so luxurious and the fit is perfect. I get compliments every time I wear it!', product: 'Floral Midi Dress', date: '1 month ago' },
  { id: 'r3', name: 'Sneha Kapoor', avatar: 'https://images.pexels.com/photos/2943953/pexels-photo-2943953.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', rating: 4, text: 'Beautiful packaging and the color is exactly as shown. Will definitely be ordering more shades.', product: 'Glossy Lip Plumper', date: '3 weeks ago' },
  { id: 'r4', name: 'Riya Mehta', avatar: 'https://images.pexels.com/photos/713312/pexels-photo-713312.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', rating: 5, text: 'These heels are gorgeous and surprisingly comfortable. Wore them all evening with no pain!', product: 'Strappy Block Heels', date: '1 week ago' },
  { id: 'r5', name: 'Diya Patel', avatar: 'https://images.pexels.com/photos/1217207/pexels-photo-1217207.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', rating: 5, text: 'The perfect everyday bag. Spacious, stylish and the leather quality is amazing for the price.', product: 'Classic Leather Handbag', date: '5 days ago' },
  { id: 'r6', name: 'Meera Iyer', avatar: 'https://images.pexels.com/photos/3781553/pexels-photo-3781553.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', rating: 4, text: 'Such a pretty necklace! It goes with everything. Would have loved a slightly longer chain though.', product: 'Layered Gold Necklace', date: '2 months ago' },
];

export const offers: Offer[] = [
  { id: 'welcome', title: 'A Little More You', subtitle: 'First Order Offer', description: 'Get 10% OFF your first order. Because you deserve a little extra.', coupon: 'WELCOME10', discount: '10% OFF', image: 'https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', cta: 'Shop the Offer', badge: 'NEW CUSTOMER' },
  { id: 'flash', title: 'Flash Sale', subtitle: '24 Hours Only', description: 'Up to 40% OFF on trending styles. Hurry, before they are gone!', coupon: 'FLASH40', discount: 'Up to 40% OFF', image: 'https://images.pexels.com/photos/27677903/pexels-photo-27677903.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', cta: 'Shop Flash Sale', badge: 'LIMITED TIME' },
  { id: 'combo', title: 'Combo Offers', subtitle: 'Bundle & Save', description: 'Buy 2 get 1 free on selected cosmetics essentials. Mix and match your favorites.', coupon: 'COMBO3', discount: 'Buy 2 Get 1', image: 'https://images.pexels.com/photos/25906586/pexels-photo-25906586.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', cta: 'Explore Combos', badge: 'BUNDLE DEAL' },
  { id: 'festival', title: 'Festival Offers', subtitle: 'Celebrate in Style', description: 'Flat 15% OFF on ethnic wear and accessories. Shine this festive season.', coupon: 'FESTIVE15', discount: '15% OFF', image: 'https://images.pexels.com/photos/8086404/pexels-photo-8086404.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', cta: 'Shop Festive', badge: 'FESTIVE SPECIAL' },
  { id: 'beauty', title: 'Cosmetics Deals', subtitle: 'Glow Up Sale', description: 'Extra 20% OFF on all cosmetics and skincare. Your best skin starts here.', coupon: 'GLOW20', discount: '20% OFF', image: 'https://images.pexels.com/photos/3750640/pexels-photo-3750640.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', cta: 'Shop Cosmetics', badge: 'COSMETICS SALE' },
  { id: 'fashion', title: 'Fashion Deals', subtitle: 'Wardrobe Refresh', description: 'Buy any 3 fashion pieces and get 25% OFF. Upgrade your everyday style.', coupon: 'STYLE25', discount: '25% OFF', image: 'https://images.pexels.com/photos/31046837/pexels-photo-31046837.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', cta: 'Shop Fashion', badge: 'FASHION SALE' },
];

export const mockOrders: MockOrder[] = [
  {
    id: 'LNL-2024-1582',
    date: 'Oct 2, 2024',
    status: 'Delivered',
    items: [
      { name: 'Velvet Matte Lipstick', image: 'https://images.pexels.com/photos/25906586/pexels-photo-25906586.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', quantity: 1, price: 599 },
      { name: 'Silk Scrunchie Set', image: 'https://images.pexels.com/photos/3373741/pexels-photo-3373741.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', quantity: 2, price: 399 },
    ],
    total: 1397,
    address: '14, MG Road, Bengaluru, Karnataka 560001',
  },
  {
    id: 'LNL-2024-1407',
    date: 'Sep 18, 2024',
    status: 'Shipped',
    items: [
      { name: 'Floral Midi Dress', image: 'https://images.pexels.com/photos/27677903/pexels-photo-27677903.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', quantity: 1, price: 1499 },
    ],
    total: 1499,
    address: '22, Park Street, Kolkata, West Bengal 700016',
  },
  {
    id: 'LNL-2024-0931',
    date: 'Aug 27, 2024',
    status: 'Delivered',
    items: [
      { name: 'Strappy Block Heels', image: 'https://images.pexels.com/photos/27046154/pexels-photo-27046154.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', quantity: 1, price: 1299 },
      { name: 'Classic Leather Handbag', image: 'https://images.pexels.com/photos/27204288/pexels-photo-27204288.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', quantity: 1, price: 1899 },
    ],
    total: 3198,
    address: '14, MG Road, Bengaluru, Karnataka 560001',
  },
];

export const galleryImages = [
  'https://images.pexels.com/photos/27383810/pexels-photo-27383810.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'https://images.pexels.com/photos/8086404/pexels-photo-8086404.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'https://images.pexels.com/photos/33401713/pexels-photo-33401713.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'https://images.pexels.com/photos/36327163/pexels-photo-36327163.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'https://images.pexels.com/photos/26736140/pexels-photo-26736140.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'https://images.pexels.com/photos/34943170/pexels-photo-34943170.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'https://images.pexels.com/photos/33190519/pexels-photo-33190519.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
];

export const heroImage = 'https://images.pexels.com/photos/16831887/pexels-photo-16831887.jpeg?auto=compress&cs=tinysrgb&h=1200&w=900';
export const editorialImage = 'https://images.pexels.com/photos/31046837/pexels-photo-31046837.jpeg?auto=compress&cs=tinysrgb&h=1000&w=800';
export const editorialImage2 = 'https://images.pexels.com/photos/33401713/pexels-photo-33401713.jpeg?auto=compress&cs=tinysrgb&h=1000&w=800';

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.category === categoryId);
}

export function getTrending(): Product[] {
  return products.filter((p) => p.trending).slice(0, 12);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew).slice(0, 12);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, count);
}
