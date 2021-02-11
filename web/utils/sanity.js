import {
  createClient,
  createImageUrlBuilder,
  createPortableTextComponent,
  createPreviewSubscriptionHook,
} from "next-sanity";
import { ListItemGroup, ListItemCard, ProductsDisplay } from '../components'

const config = {
  //TODO: put everything in env
  projectId: 'rrw497vy',
  dataset: 'production', 
  useCdn: false //check if production
}

export const sanityClient = createClient(config);
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const PortableText = createPortableTextComponent({
  ...config,
  // Serializers passed to @sanity/block-content-to-react
  // (https://github.com/sanity-io/block-content-to-react)
  serializers: {
    types: {
      listItemGroup: props => (<ListItemGroup listItems={props.node.children} />),
      listItem: props => (<ListItemCard item={props.node} />),
      productsDisplay: props => (<ProductsDisplay
        products={props.node.products}
        fullSize={!props.node.copy || typeof(props.node.copy) == 'undefined'}
        copy={props.node.copy} />),
      hr: props => (<hr />),
      undefined: props => (<span />)
    }
  },
});

