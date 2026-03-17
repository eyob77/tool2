import {ButtonBlock, CollectionListBlock, Container, DivBlock, HeadingBlock, HFlex, LinkBlock, ListBlock, ListItemBlock, ParagraphBlock, QuickStack, QuoteBlock, RichTextBlock, Section, TextBlock, TextLinkBlock, VFlex} from "../../svgs"
export const Elements = [
  {
    name:"Structure",
    elements:[
      {name:"Section",svg:Section},
      {name:"Container",svg:Container},
      {name:"Quick Stack",svg:QuickStack},
      {name:"V Flex",svg:VFlex},
      {name:"H Flex",svg:HFlex},
    ]
  },
  {
    name:'Basic',
    elements:[
      {name:'Div Block',svg:DivBlock},
      {name:'List' , svg:ListBlock},
      {name:'List Item',svg:ListItemBlock},
      {name:'Link Block',svg:LinkBlock},
      {name:'Button',svg:ButtonBlock},
    ]
  },
  {
    name:"Typography",
    elements:[
      {name:"Heading",svg:HeadingBlock},
      {name:"Paragraph",svg:ParagraphBlock},
      {name:"Text Link",svg:TextLinkBlock},
      {name:"Text",svg:TextBlock},
      {name:"Quote",svg:QuoteBlock},
      {name:"Rich Text",svg:RichTextBlock},
    ]
  },
  {
    name:"Collection List",
    elements:[
      {name:"Collection List",svg:CollectionListBlock},
    ]
  }
]