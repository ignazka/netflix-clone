import MuiModal from '@mui/material/Modal'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modelAtom'
import {
  XIcon,
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { Element, Genre } from '../typings'
import ReactPlayer from 'react-player/lazy'
import { FaPlay } from 'react-icons/fa'
function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [movie, setMovie] = useRecoilState(movieState)
  const [trailer, setTrailer] = useState()
  const [genres, setGenres] = useState<Genre[]>()
  const [muted, setMuted] = useState(false)
  const handleClose = () => {
    setShowModal(false)
  }

  useEffect(() => {
    if (!movie) return

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json())
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        )
        setTrailer(data.videos?.results[index]?.key)
      }
      if (data?.genres) {
        setGenres(data.genres)
      }
    }
    fetchMovie()
  }, [movie])
  return (
    <MuiModal
      className="roundedn-md fixed !top-7 left-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll scrollbar-hide"
      open={showModal}
      onClose={handleClose}
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XIcon className="h-6 w-6" />
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            height="100%"
            width="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />
        </div>
        <div className="absolute bottom-10 flex w-full items-center justify-between p-5">
          <div className="flex space-x-2">
            <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
              {' '}
              <FaPlay className="h-7 w-7 text-black" />
              Play
            </button>
            <button className="modalButton h-7 w-7">
              <PlusIcon />
            </button>
            <button className="modalButton h-7 w-7">
              <ThumbUpIcon />
            </button>
          </div>
          <button
            className="modalButton h-7 w-7"
            onClick={() => setMuted(!muted)}
          >
            {muted ? (
              <VolumeUpIcon className="h-6 w-6" />
            ) : (
              <VolumeOffIcon className="h-6 w-6" />
            )}
          </button>
        </div>
        <div>
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie?.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="w-5/6">
              <p>{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres</span>
                  {genres?.map((genres) => genres.name).join(', ')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  )
}

export default Modal
