"use client";

import { getLocalStorage } from "@/utils/storage";

export default function ChatContent() {
  const message = getLocalStorage("message chatbot");

  return (
    <div
      className={`flex flex-col gap-4 ${
        message ? "" : "items-center justify-center "
      }  w-full`}
    >
      {message ? (
        <div className="flex items-center gap-16 flex-col justify-center w-full">
          <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 w-fit max-w-sm">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
              aliquam reprehenderit iure inventore maiores, aperiam tempore
              maxime molestiae eum dolor officia odit illum. Doloribus minima
              nesciunt sint similique odio debitis facere eveniet delectus
              pariatur ab nostrum at, quasi voluptatem officia modi quam?
              Eligendi ea, provident officia, dolore animi nostrum sit
              necessitatibus quaerat quod id adipisci repellat ducimus doloribus
              obcaecati incidunt optio vero. Beatae ea nobis eum. Tenetur eos
              iste porro ea minus optio ipsum suscipit magni quam reprehenderit,
              possimus repudiandae vero modi maiores veniam unde laboriosam quis
              non eum corporis, placeat atque alias! Ratione, nemo quod deserunt
              ut voluptates sunt.
            </p>
          </div>
          <p className="text-sm w-full text-gray-700 dark:text-gray-300">
            answer Response
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full py-8">
          <div className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Hi Svay Phanharith please ask me anything ?
          </div>
        </div>
      )}
    </div>
  );
}
