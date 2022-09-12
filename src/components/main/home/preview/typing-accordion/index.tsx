import { AccordionType } from '../../../../base/accordion-group/data';
import TypingBadge from '../../../../base/typing-badge';

const getTypeAcc = (typeMap: any[] | undefined): AccordionType => ({
  title: 'Typenübersicht',
  detail: typeMap ? (
    <div className="flex flex-wrap gap-1">
      {typeMap.map((type: any, index: number) => (
        <div key={`type-amount-${index}`} className="flex gap-1">
          <span>{type.amount || 0}x</span>
          <TypingBadge type={type.type_id} text={type.name} small />
        </div>
      ))}
    </div>
  ) : (
    <span>Keine Typen gefunden</span>
  ),
});

export default getTypeAcc;
