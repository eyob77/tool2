import {ButtonBlock, CheckboxBlock, CollectionListBlock, Container, DivBlock, FileUploadInputBlock, FormBlock, HeadingBlock, HFlex, InputBlock, LableBlock, LinkBlock, ListBlock, ListItemBlock, ParagraphBlock, QuickStack, QuoteBlock, RadioButtonBlock, RichTextBlock, Section, SelectBlock, SubmiteButtonBlock, TextareaBlock, TextBlock, TextLinkBlock, VFlex} from "../../svgs"
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
  },
  {
    name:"Forms",
    elements:[
      {name:"Form Block" ,svg:FormBlock},
      {name:"Label" ,svg:LableBlock},
      {name:"Input" ,svg:InputBlock},
      {name:"File Upload" ,svg:FileUploadInputBlock},
      {name:"Text Area" ,svg:TextareaBlock},
      {name:"Checkbox" ,svg:CheckboxBlock},
      {name:"Radio Button" ,svg:RadioButtonBlock},
      {name:"Select" ,svg:SelectBlock},
      {name:"Form Button" ,svg:SubmiteButtonBlock},
    ]
  }
]