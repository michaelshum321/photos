import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import Image from 'next/image';

export default function Page() {
  const router = useRouter();
  const image = api.image.getOne.useQuery({ id: router.query.id as string }); // .hello.useQuery({ text: "potato pasta" });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const path = image.data ? image.data.fullSizePath : '';
  console.log(image.data);
  return (
  <div>
    <p>Post: {image ? JSON.stringify(image) : 'nothing'} </p>
    { path ? <Image src={path} width={768} height={1024} alt="meow"/> : ''}
  </div>
  );
}